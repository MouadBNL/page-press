import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";


export class GetSelectorToStyleCommand extends CommandHandler<void, string | null> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(): string | null {
		const editor = this._context.gjseditor;
		const target = editor.getSelectedToStyle();
		 // Style target is a CSS rule
		 if (target?.getSelectorsString) {
			return target.getSelectorsString();
		}
	

		return null;
	}
}