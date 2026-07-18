import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { EditorElement } from "../../elements";

type Payload = {
	element: EditorElement;
	hovered: boolean;
}
export class LayerHoverCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): void {
		const editor = this._context.gjseditor;
		editor.Layers.setLayerData(payload.element, {
			hovered: payload.hovered,
		});
		return;
	}
}