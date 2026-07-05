import { type Editor as GjsEditor } from "grapesjs";
import { EditorComponentDefinition } from "../types";


export function registerComponentType(gjseditor: GjsEditor, component: EditorComponentDefinition) {
	gjseditor.Components.addType(component.id, {
		isComponent: (el) => el.tagName === component.rootTagName && el.hasAttribute(`data-pgpress-${component.id}`),
		model: {
			defaults: {
				selectable: false,
			},
			attributes: {
				content: component.content,
			},
		},
	});
}