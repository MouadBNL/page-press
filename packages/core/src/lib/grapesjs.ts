import grapesjs from "grapesjs";
import 'grapesjs/dist/css/grapes.min.css';
import { defaultOptions } from "../constants/grapesjs";
import { PgpressCommonPlugin, PgpressSpotlightPlugin } from "./pgpress-plugin";
// import { DemoBlockTypePlugin } from "./gjs-plugins";


export function createGrapesjsEditor(container: HTMLElement) {

	const MY = `#193cb8`;

	const editor = grapesjs.init({
		container: container,
		plugins: [
			// DemoBlockTypePlugin,
			PgpressCommonPlugin,
			PgpressSpotlightPlugin,
		],
		panels: { defaults: [] },
		layerManager: {
			root: 'default-layer-manager',
		},
		...defaultOptions,
		canvasCss: `
    .gjs-selected {
      outline: 2px solid ${MY} !important;
      outline-offset: -2px;
    }
    .gjs-selected-parent {
      outline: 2px solid ${MY}80 !important; /* 80 = ~50% alpha */
    }
    .gjs-dashed *[data-gjs-highlightable] {
      outline: 1px dashed ${MY} !important;
      outline-offset: -2px;
    }
  `,
	});

	const canvas = document.querySelector('.gjs-cv-canvas') as HTMLDivElement;
	if (canvas) {
		canvas.style.height = '100%';
		canvas.style.width = '100%';
		canvas.style.top = '0';
	}

	(window as any).gjs = editor;

	return editor;
}