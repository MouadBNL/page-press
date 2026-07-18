import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";


type Payload = {
		name: string;
}

export class RemoveSelectedCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): void {
		const editor = this._context.gjseditor;
		const selector = editor.Selectors.get(payload.name);
		if (selector) {
			editor.Selectors.removeSelected(selector);
		}
		console.log('RemoveSelectedCommand handle', payload.name);
		this._context.emit('selectors:updated', undefined);
		return;
	}
}