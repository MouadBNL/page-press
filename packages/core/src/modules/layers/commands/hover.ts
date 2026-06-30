import { Component } from "grapesjs";
import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";

type Payload = {
	component: Component;
	hovered: boolean;
}
export class LayerHoverCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<void> {
		const editor = this._context.gjseditor;
		editor.Layers.setLayerData(payload.component, {
			hovered: payload.hovered,
		});
		return Promise.resolve();
	}
}