import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { findPrimitiveProperty } from "../lib";
import { PropertyPrimitiveQuery, StackProperty } from "../type";



type Payload = {
	query: PropertyPrimitiveQuery;
}
export class GetSelectedLayerCommand extends CommandHandler<Payload, number | null> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<number | null> {
		const editor = this._context.gjseditor;
		const property = findPrimitiveProperty(editor, payload.query);
		if (!property) {
			return Promise.resolve(null);
		}

		const stackProperty = property as StackProperty;
		const selectedLayer = stackProperty.getLayers().find(layer => layer.isSelected());
		if (!selectedLayer) {
			return Promise.resolve(null);
		}
		return Promise.resolve(selectedLayer.getIndex());
	}
}	