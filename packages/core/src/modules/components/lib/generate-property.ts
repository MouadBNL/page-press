import { EditorComponentPropDefinition, EditorComponentPropType } from "../types";


type GeneratedComponentProperty = {
	key: string;
	def: EditorComponentPropDefinition
}

export function generateComponentProperty(name: string, type: EditorComponentPropType): GeneratedComponentProperty {
	return {
		key: generateComponentPropertyKey(name),
		def: generateComponentPropertyDefinition(type, name),
	};
}


function generateComponentPropertyKey(name: string): string {
	let result = name
		.toLowerCase()
		.replace(/[^a-z0-9_]+/g, '_')
		.replace(/_+/g, '_')
		.replace(/^_|_$/g, '');

	if (/^[0-9]/.test(result)) {
		result = `_${result}`;
	}

	return result;
}

function generateComponentPropertyDefinition(type: EditorComponentPropType, name: string): EditorComponentPropDefinition {
	switch (type) {
		case 'text':
			return {
				type: 'text',
				label: name,
				placeholder: 'Enter text',
				default: '',
			};
		case 'numeric':
			return {
				type: 'numeric',
				label: name,
				default: 0,
			};
		default:
			throw new Error(`Unsupported property type: ${type}`);
	}
}