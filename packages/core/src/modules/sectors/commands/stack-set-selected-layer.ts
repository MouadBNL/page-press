import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { findPrimitiveProperty } from "../lib";
import { PropertyPrimitiveQuery, StackProperty } from "../type";


type Payload = {
	query: PropertyPrimitiveQuery;
	layerIdx: number;
}

export class StackSetSelectedLayerCommand extends CommandHandler<Payload, boolean> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<boolean> {
		const editor = this._context.gjseditor;
		const property = findPrimitiveProperty(editor, payload.query);
		if (!property) {
			return Promise.reject(false);
		}
		const layer = (property as StackProperty).getLayer(payload.layerIdx);
		if (!layer) {
			return Promise.reject(false);
		}
		layer.select();
		this._context.emit('sectors:updated', []);
		return Promise.resolve(true);
	}
}	