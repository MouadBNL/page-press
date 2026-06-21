import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { BlockDefinition } from "../types";



export class BlockListCommand extends CommandHandler<void, BlockDefinition[]> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(): Promise<BlockDefinition[]> {
		const blocks = this._context.blockManager.list();
		return Promise.resolve(blocks);
	}
}