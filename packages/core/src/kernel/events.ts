import { EventBus } from "../lib/event-bus";
import { EditorContext } from "./types";
import { BlockEvents } from "../modules/blocks";
import { ElementEvents } from "../modules/elements";
import { SelectorEvents } from "../modules/selectors";


import { type StyleEvents, registerStyleEvents } from "../modules/styles";
import { type LayerEvents, registerLayerEvents } from "../modules/layers";
import { CommonEvents } from "../modules/common";

export type EditorEvents = CommonEvents &
	ElementEvents &
	BlockEvents &
	SelectorEvents  &
	StyleEvents &
	LayerEvents;

export type EditorEventBus = EventBus<EditorEvents>;

export function createEditorEventBus(): EditorEventBus {
	return new EventBus<EditorEvents>();
}


export function registerEditorEvents(bus: EditorEventBus, context: EditorContext) {
	const editor = context.gjseditor;
	editor.on('component:selected', (e) => {
		console.log('component:selected', e)
		bus.emit('elements:selected', e);
	});
	bus.emit('style:sectors:ready', undefined);

	registerStyleEvents(bus, context);
	registerLayerEvents(bus, context);
}