import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { findPrimitiveProperty } from "../lib";
import { StylePropertyPrimitiveQuery, StackStyleProperty } from "../type";


type Payload = {
	query: StylePropertyPrimitiveQuery;
	layerIdx: number;
}
export class StackRemoveLayerCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<void> {
		const editor = this._context.gjseditor;
		const property = findPrimitiveProperty(editor, payload.query);
		if (!property) {
			return Promise.reject();
		}
		const layer = (property as StackStyleProperty).getLayer(payload.layerIdx);
		if (!layer) {
			return Promise.reject();
		}
		(property as StackStyleProperty).removeLayer(layer);
		this._context.emit('style:sectors:updated', []);
		return Promise.resolve();
	}
}