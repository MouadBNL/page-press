import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";


type Payload = {
	name: string;
}

export class DisableSelectorCommand extends CommandHandler<Payload, boolean> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<boolean> {
		const editor = this._context.gjseditor;
		const selector = editor.Selectors.getSelector(payload.name);
		if(selector) {
			selector.setActive(false);
		}
		this._context.emit('selectors:updated', undefined);
		return Promise.resolve(true);
	}
}