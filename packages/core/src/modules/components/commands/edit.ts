import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";

export class ComponentEditCommand extends CommandHandler<void, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(): void {
		console.log('[ComponentEditCommand] handle');
		this._context.run('spotlight:enable');

		this._context.editor.once('spotlight:disabled', () => {
			console.log('[ComponentEditCommand] spotlight:disabled, emitting component:edited');
			this._context.emit('component:edited', undefined);
		});


		const selected = this._context.gjseditor.getSelected()?.getType();
		if (!selected) {
			this._context.emit('component:edit-failed', undefined);
			return;
		}

		const component = this._context.componentManager().get(selected);

		if (!component) {
			this._context.emit('component:edit-failed', undefined);
			return;
		}

		console.log('[ComponentEditCommand] component:editing', component);
		this._context.emit('component:editing', { component });
	}
}