import { Component, EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { ComponentProperty } from "../types";



type Payload = void;

export class GetSelectedElementPropertiesCommand extends CommandHandler<Payload, ComponentProperty[]> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<ComponentProperty[]> {
		const editor = this._context.gjseditor;
		console.log('LayerToggleVisibilityCommand', payload);
		const traits = editor.Traits.getTraits();
		return Promise.resolve(traits);
	}
}