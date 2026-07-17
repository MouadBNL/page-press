import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";

export class SpotlightEnableCommand extends CommandHandler<void, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(): Promise<void> {
		const editor = this._context.gjseditor;
		editor.Commands.run('spotlight:set');

		this._context.editor.once('elements:selected', () => {
			this._context.run('spotlight:disable', undefined as void);
		});
		return Promise.resolve();
	}
}