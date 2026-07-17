import type { Plugin } from 'grapesjs';

export const PgpressSpotlightPlugin: Plugin = (editor, config) => {


	const cssRules = `
		body.pgpress-spotlight-mode {
			background-color: gray;
		}
		body.pgpress-spotlight-mode {
			pointer-events: none;
			user-select: none;
			filter: brightness(0.7);
		}
		.pgpress-spotlighted-element, .pgpress-spotlighted-element > * {
			pointer-events: auto;
			user-select: auto;
			filter: brightness(1);
		}
	`

	editor.on('load', () => {
		console.log('[PgpressPlugin] load called');
		editor.addStyle(cssRules)
		console.log('[PgpressPlugin] cssRules added', { cssRules });
	});

	editor.Commands.add('spotlight:set', (editor) => {
		console.log('[PgpressPlugin] spotlight:set called');
		const selected = editor.getSelected();
		const bodyEl = editor.Canvas.getBody();
		if (!selected || !bodyEl) return;


		selected.addClass('pgpress-spotlighted-element');
		bodyEl.classList.add('pgpress-spotlight-mode');
	});

	editor.Commands.add('spotlight:unset', (editor) => {
		console.log('[PgpressPlugin] spotlight:unset called');
		const bodyEl = editor.Canvas.getBody();
		const wrapperEl = editor.getWrapper();
		if (!wrapperEl) return;
		wrapperEl.find('.pgpress-spotlighted-element').forEach((comp) => {
			comp.removeClass('pgpress-spotlighted-element');
		});

		bodyEl.classList.remove('pgpress-spotlight-mode');
	});
};