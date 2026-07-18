import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { findPrimitiveProperty } from "../lib";
import { StylePropertyPrimitiveQuery, StackStyleProperty } from "../type";


type Payload = {
	query: StylePropertyPrimitiveQuery;
	layerIdx: number;
}

export class StackSetSelectedLayerCommand extends CommandHandler<Payload, boolean> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): boolean {
		const editor = this._context.gjseditor;
		const property = findPrimitiveProperty(editor, payload.query);
		if (!property) {
			return false;
		}
		const layer = (property as StackStyleProperty).getLayer(payload.layerIdx);
		if (!layer) {
			return false;
		}
		layer.select();
		this._context.emit('style:sectors:updated', []);
		return true;
	}
}	