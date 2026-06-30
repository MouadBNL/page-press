import { EditorEventBus } from "../../kernel/events";
import { EditorContext } from "../../kernel/types";
import { LayerTreeNode } from "./types"



export type LayerEvents = {
	"layers:updated": void
}


export function registerLayerEvents(bus: EditorEventBus, context: EditorContext) {
	const editor = context.gjseditor;
	editor.on('layer:component', () => {
		console.log('GJS Editor layer:component event');
		bus.emit('layers:updated', undefined);
	});
}