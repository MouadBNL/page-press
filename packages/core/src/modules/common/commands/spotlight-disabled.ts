import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";

export class SpotlightDisabledCommand extends CommandHandler<void, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(): void {
		const editor = this._context.gjseditor;
		editor.Commands.run('spotlight:unset');
		console.log('[SpotlightDisabledCommand] run  spotlight:unset');
		this._context.emit('spotlight:disabled', undefined);
		console.log('[SpotlightDisabledCommand] emit spotlight:disabled');
		return;
	}
}