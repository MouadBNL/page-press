import { EditorContext } from "../../../kernel/types";
import { EditorElement } from "../types";
import { CommandHandler } from "../../../lib/command-bus";

type Payload = {
	element: EditorElement;
}

export class ElementSelectCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): void {
		const editor = this._context.gjseditor;
		editor.select(payload.element);
	}
}