import { EditorEventBus } from "../../kernel/events";
import { EditorContext } from "../../kernel/types";
import { EditorComponentDefinition } from "./types";
import { Component as GjsComponent } from "grapesjs";


export type ComponentEvents = {
	'component:editing': { component: EditorComponentDefinition };
	'component:edited': void;
	'component:edit-failed': void;
	'component:update': { component: EditorComponentDefinition };

	'components:list:updated': void;
};



export function registerComponentEvents(bus: EditorEventBus, context: EditorContext) {
	const editor = context.gjseditor;
	editor.on('pgpress:component:editing', ({ component }: { component: GjsComponent }) => {
		console.log('[registerComponentEvents] pgpress:component:editing', {component});
		context.run("components:edit");
	});
}