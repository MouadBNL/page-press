import { Component, EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";


type Payload = {
	component: Component;
	locked: boolean;
}
export class LayerToggleLockCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<void> {
		const editor = this._context.gjseditor;
		editor.Layers.setLayerData(payload.component, {
			locked: payload.locked,
		});
		return Promise.resolve();
	}
}