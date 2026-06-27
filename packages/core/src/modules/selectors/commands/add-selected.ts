import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";


type Payload = {
	selector: {
		name: string;
		type: 'id' | 'class';
	};
}

export class AddSelectedCommand extends CommandHandler<Payload, boolean> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<boolean> {
		const editor = this._context.gjseditor;
		editor.Selectors.addSelected({
			name: payload.selector.name,
			type: payload.selector.type === 'class' ? 1 : 2,
		});
		console.log('AddSelectedCommand handle', payload.selector);
		this._context.emit('selectors:updated', undefined);
		return Promise.resolve(true);
	}
}