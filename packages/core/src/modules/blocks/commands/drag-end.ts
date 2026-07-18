import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";


export class BlockDragEndCommand extends CommandHandler<void, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(): void {
		const editor = this._context.gjseditor;
		editor.Canvas.endDrag();
		return;
	}
}