

type ConstructorParams = {
	id: string;
	label: string;
	content: string;
}

export class EditorComponentDefinition {
	public readonly id: string;
	public readonly label: string;
	public readonly content: string;

	constructor(params: ConstructorParams) {
		this.id = params.id;
		this.label = params.label;
		this.content = params.content;
	}
}