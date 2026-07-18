import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { BlockDefinition } from "../types";

type Payload = BlockDefinition[]

export class BlockLoadCommand extends CommandHandler<Payload, boolean> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): boolean {
		this._context.emit('blocks:loading');
		this._context.blockManager().set(payload);
		this._context.emit('blocks:loaded');
		return true;
	}
}