import { EditorEventBus } from "../../kernel/events";
import { EditorContext } from "../../kernel/types";


export type LayerEvents = {
	"layers:updated": void
}


export function registerLayerEvents(bus: EditorEventBus, context: EditorContext) {
	const editor = context.gjseditor;
	editor.on('layer:component', () => {
		bus.emit('layers:updated', undefined);
	});
}