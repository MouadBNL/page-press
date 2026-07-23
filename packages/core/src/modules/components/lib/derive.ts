import { TraitProperties } from "grapesjs";
import { EditorComponentPropDefinition } from "../types";


export function extractDefaultProps(props: Record<string, EditorComponentPropDefinition>) {

	let result: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(props)) {
		if (value?.default) {
			result[key] = value.default.toString();
		}
	}

	console.log("extractDefaultProps", result);
	return result;
}export function extractTraits(props: Record<string, EditorComponentPropDefinition>) {
	return Object.entries(props).map(([key, value]) => propDefinitionToTrait(key, value));
}
export function propDefinitionToTrait(id: string, propDefinition: EditorComponentPropDefinition): Partial<TraitProperties> {

	return {
		id: id,
		name: id,
		label: propDefinition.label,
		type: propDefinition.type,
		placeholder: propDefinition.label ?? '',
		getValue: ({ component }) => {
			return component.get('props')?.[id];
		},
		setValue: ({ component, value }) => {
			component.set('props', { ...component.get('props'), [id]: value });
			component.trigger('change:props');
		},
	};
}

