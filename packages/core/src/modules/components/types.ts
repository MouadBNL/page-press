


export type EditorComponent = {

}



export type EditorComponentDefinition<TProps extends Record<string, { required: boolean }> = {}> = {
	id: string;
	label: string;
	rootTagName: string;
	content: string;
	props: {
		[K in keyof TProps]: TProps[K]['required'] extends true ? EditorComponentPropDefinition : EditorComponentPropDefinition | undefined
	};
}


export type EditorComponentPropType = EditorComponentPropDefinition['type'];

export type EditorComponentPropDefinition = 
| EditorComponentTextPropDefinition
| EditorComponentNumericPropDefinition;


export type EditorComponentTextPropDefinition = {
	type: 'text';
	label: string;
	default?: string;
	placeholder?: string;
}


export type EditorComponentNumericPropDefinition = {
	type: 'numeric';
	label: string;
	default?: number;
	min?: number;
	max?: number;
}

