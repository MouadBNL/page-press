import grapesjs from "grapesjs";
import 'grapesjs/dist/css/grapes.min.css';
import { defaultOptions } from "../constants/grapesjs";
// import { DemoBlockTypePlugin } from "./gjs-plugins";


export function createGrapesjsEditor(container: HTMLElement) {

	const editor = grapesjs.init({
		container: container,
		plugins: [
			// DemoBlockTypePlugin,
		],
		panels: {defaults: []},
		layerManager: {
			root: 'default-layer-manager',
		},
		...defaultOptions,
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