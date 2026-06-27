import { EventBus } from "../lib/event-bus";
import { BlockEvents } from "../modules/blocks";
import { ComponentEvents } from "../modules/components";
import { EditorContext } from "./types";



export type EditorEvents = &
	ComponentEvents &
	BlockEvents;

export type EditorEventBus = EventBus<EditorEvents>;

export function createEditorEventBus(): EditorEventBus {
	return new EventBus<EditorEvents>();
}


export function registerEditorEvents(bus: EditorEventBus, context: EditorContext) {
	const editor = context.gjseditor;
	editor.on('component:selected', (e) => {
		console.log('component:selected', e)
		bus.emit('components:selected', e);
	});
}