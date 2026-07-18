import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";


type Payload = {
	blockId: string,
}
export class BlockDragStartCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): void {
		const block = this._context.blockManager().get(payload.blockId);
		if(!block) {
			console.warn(`Could not find block with id ${payload.blockId}.`);
			return;
		}

		const editor = this._context.gjseditor;
		editor.Canvas.startDrag(block);
		return;
	}
}