import type { Component, Plugin } from 'grapesjs';

const OVERLAY_BG = 'rgba(0, 0, 0, 0.45)';
const HOLE_PADDING = -1;

/**
 * Spotlight: dims everything in the canvas except the selected component.
 *
 * The dim layer lives in the OUTER document (on top of the canvas iframe), so
 * user-authored z-indexes inside the canvas can never paint above it. The
 * spotlighted element shows through a clip-path "hole" cut into the overlay;
 * clip-path also removes the hole from hit-testing, so clicks inside it reach
 * the canvas normally while clicks anywhere else land on the overlay.
 *
 * Exit paths (all funnel into `spotlight:unset`):
 *  - pointerdown on the overlay (i.e. any click outside the spotlighted element)
 *  - selection moves outside the spotlighted subtree (or is cleared)
 *  - the spotlighted component (or an ancestor of it) is removed
 */
export const PgpressSpotlightPlugin: Plugin = (editor) => {
	let active = false;
	let spotlighted: Component | null = null;
	let overlay: HTMLDivElement | null = null;
	let resizeObserver: ResizeObserver | null = null;
	let rafId = 0;
	let selectionCheckPending = false;

	/** True if `cmp` is the spotlighted component or one of its descendants. */
	const isInSpotlight = (cmp?: Component | null): boolean => {
		let cur: Component | null | undefined = cmp;
		while (cur) {
			if (cur === spotlighted) return true;
			cur = cur.parent();
		}
		return false;
	};

	/** True if `ancestor` is `cmp` itself or an ancestor of it. */
	const containsComponent = (ancestor: Component, cmp: Component): boolean => {
		let cur: Component | null | undefined = cmp;
		while (cur) {
			if (cur === ancestor) return true;
			cur = cur.parent();
		}
		return false;
	};

	const updateClipPath = () => {
		if (!overlay || !spotlighted) return;
		const el = spotlighted.getEl();
		const frameEl = editor.Canvas.getFrameEl();
		const canvasEl = editor.Canvas.getElement();
		if (!el || !frameEl || !canvasEl) return;

		const frameRect = frameEl.getBoundingClientRect();
		const canvasRect = canvasEl.getBoundingClientRect();
		// Rects measured inside the iframe are in iframe CSS pixels; if the frame
		// is zoomed (CSS transform), map them through the visual/layout ratio.
		const scale = frameEl.offsetWidth ? frameRect.width / frameEl.offsetWidth : 1;
		const elRect = el.getBoundingClientRect();

		const x1 = frameRect.left - canvasRect.left + elRect.left * scale - HOLE_PADDING;
		const y1 = frameRect.top - canvasRect.top + elRect.top * scale - HOLE_PADDING;
		const x2 = x1 + elRect.width * scale + HOLE_PADDING * 2;
		const y2 = y1 + elRect.height * scale + HOLE_PADDING * 2;

		// Outer rect wound clockwise, hole counter-clockwise: with the default
		// nonzero fill rule the hole is excluded from both painting and
		// hit-testing, so clicks inside it pass through to the canvas.
		overlay.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${x1}px ${y1}px, ${x1}px ${y2}px, ${x2}px ${y2}px, ${x2}px ${y1}px, ${x1}px ${y1}px)`;
	};

	const scheduleUpdate = () => {
		if (!active || rafId) return;
		rafId = requestAnimationFrame(() => {
			rafId = 0;
			updateClipPath();
		});
	};

	const onOverlayPointerDown = (event: PointerEvent) => {
		event.preventDefault();
		event.stopPropagation();
		editor.Commands.run('spotlight:unset');
	};

	// `component:toggled` fires mid-way through selection changes (deselect old,
	// select new), so defer the check until the selection has settled to avoid
	// tearing down while moving the selection to a child of the spotlighted
	// element.
	const onSelectionToggled = () => {
		if (!active || selectionCheckPending) return;
		selectionCheckPending = true;
		setTimeout(() => {
			selectionCheckPending = false;
			if (!active) return;
			const selected = editor.getSelected();
			if (!isInSpotlight(selected)) editor.Commands.run('spotlight:unset');
		}, 0);
	};

	const onComponentRemove = (removed: Component) => {
		if (!active || !spotlighted) return;
		if (containsComponent(removed, spotlighted)) editor.Commands.run('spotlight:unset');
	};

	const teardown = () => {
		if (!active && !overlay) return;
		active = false;

		if (rafId) {
			cancelAnimationFrame(rafId);
			rafId = 0;
		}
		resizeObserver?.disconnect();
		resizeObserver = null;

		try {
			editor.Canvas.getWindow()?.removeEventListener('scroll', scheduleUpdate, true);
		} catch {
			// frame may already be gone (editor destroy)
		}
		window.removeEventListener('resize', scheduleUpdate);

		editor.off('component:toggled', onSelectionToggled);
		editor.off('component:remove', onComponentRemove);
		editor.off('component:update', scheduleUpdate);
		editor.off('component:styleUpdate', scheduleUpdate);
		editor.off('canvas:zoom', scheduleUpdate);
		editor.off('canvas:refresh', scheduleUpdate);

		overlay?.removeEventListener('pointerdown', onOverlayPointerDown);
		overlay?.remove();
		overlay = null;
		spotlighted = null;
	};

	editor.Commands.add('spotlight:set', () => {
		const selected = editor.getSelected();
		const canvasEl = editor.Canvas.getElement();
		if (!selected || !canvasEl) return;

		// Idempotent: switching targets cleans up the previous spotlight first.
		teardown();

		spotlighted = selected;
		active = true;

		overlay = document.createElement('div');
		overlay.className = 'pgpress-spotlight-overlay';
		Object.assign(overlay.style, {
			position: 'absolute',
			inset: '0',
			backgroundColor: OVERLAY_BG,
			// Above the frames wrapper (z-index auto) but below the gjs tools
			// layers (.gjs-tools z-index 1 later in DOM, #gjs-tools z-index 2),
			// so the selected-component toolbar stays visible and clickable.
			zIndex: '1',
		});
		overlay.addEventListener('pointerdown', onOverlayPointerDown);
		const framesEl = canvasEl.querySelector('.gjs-cv-canvas__frames');
		canvasEl.insertBefore(overlay, framesEl ? framesEl.nextSibling : null);

		// Reposition the hole whenever anything can move/resize the element.
		resizeObserver = new ResizeObserver(scheduleUpdate);
		const el = spotlighted.getEl();
		if (el) resizeObserver.observe(el);
		const frameEl = editor.Canvas.getFrameEl();
		if (frameEl) resizeObserver.observe(frameEl);

		editor.Canvas.getWindow()?.addEventListener('scroll', scheduleUpdate, true);
		window.addEventListener('resize', scheduleUpdate);

		editor.on('component:toggled', onSelectionToggled);
		editor.on('component:remove', onComponentRemove);
		editor.on('component:update', scheduleUpdate);
		editor.on('component:styleUpdate', scheduleUpdate);
		editor.on('canvas:zoom', scheduleUpdate);
		editor.on('canvas:refresh', scheduleUpdate);

		updateClipPath();
	});

	editor.Commands.add('spotlight:unset', teardown);

	editor.on('destroy', teardown);
};
