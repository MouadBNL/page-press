import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { EditorComponentDefinition } from "../types";



export class ComponentListCommand extends CommandHandler<void, EditorComponentDefinition[]> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(): Promise<EditorComponentDefinition[]> {
		const components = this._context.componentManager.list();
		return Promise.resolve(components);
	}
}