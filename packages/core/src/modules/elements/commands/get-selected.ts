import { EditorContext } from "../../../kernel/types";
import { EditorElement } from "../types";
import { CommandHandler } from "../../../lib/command-bus";

export class ElementGetSelectedCommand extends CommandHandler<void, EditorElement|undefined> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(): EditorElement|undefined {
		const editor = this._context.gjseditor;
		return editor.getSelected();
	}
}