import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";

export class SpotlightEnableCommand extends CommandHandler<void, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(): void {
		const editor = this._context.gjseditor;
		// Exit paths (click outside, selection leaving the subtree, removal)
		// are handled by the spotlight plugin itself.
		editor.Commands.run('spotlight:set');
		this._context.emit('spotlight:enabled', undefined);
		return;
	}
}