import { EditorContext } from "../../../kernel/types";
import { EditorElement } from "../../elements";
import { CommandHandler } from "../../../lib/command-bus";


type Payload = {
	element: EditorElement;
	open: boolean;
}
export class LayerToggleExpandCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): void {
		const editor = this._context.gjseditor;
		editor.Layers.setLayerData(payload.element, {
			open: payload.open,
		});
		return;
	}
}