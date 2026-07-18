import { EditorEventBus } from "../../kernel/events";
import { EditorContext } from "../../kernel/types";


type SpotlightEvents = {
	'spotlight:enabled': void;
	'spotlight:disabled': void;
};


export type CommonEvents = SpotlightEvents;


export function registerCommonEvents(bus: EditorEventBus, context: EditorContext) {
	registerSpotlightEvents(bus, context);
}

function registerSpotlightEvents(bus: EditorEventBus, context: EditorContext) {
	const editor = context.gjseditor;
	editor.on('spotlight:disabled', () => {
		console.log('[registerSpotlightEvents] spotlight:disabled');
		bus.emit('spotlight:disabled');
	});
}

