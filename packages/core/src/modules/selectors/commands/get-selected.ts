import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { Selector } from "..";



export class GetSelectedCommand extends CommandHandler<void, Selector[]> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(): Selector[] {
		const editor = this._context.gjseditor;
		const selected = editor.Selectors.getSelected();
		const selectors: Selector[] = selected.map(selector => ({
			name: selector.getName(),
			label: selector.getLabel(),
			type: selector.isId() ? 'id' : 'class',
			active: selector.getActive()
		}));
		return selectors;
	}
}