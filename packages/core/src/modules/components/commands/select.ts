import { Component, EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";

type Payload = {
	component: Component;
}

export class ComponentSelectCommand extends CommandHandler<Payload, boolean> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<boolean> {
		const editor = this._context.gjseditor;
		editor.select(payload.component);
		return Promise.resolve(true);
	}
}