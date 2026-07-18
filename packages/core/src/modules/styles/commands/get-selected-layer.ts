import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { findPrimitiveProperty } from "../lib";
import { StylePropertyPrimitiveQuery, StackStyleProperty } from "../type";



type Payload = {
	query: StylePropertyPrimitiveQuery;
}
export class GetSelectedLayerCommand extends CommandHandler<Payload, number | null> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): number | null {
		const editor = this._context.gjseditor;
		const property = findPrimitiveProperty(editor, payload.query);
		if (!property) {
			return null;
		}

		const stackProperty = property as StackStyleProperty;
		const selectedLayer = stackProperty.getLayers().find(layer => layer.isSelected());
		if (!selectedLayer) {
			return null;
		}
		return selectedLayer.getIndex();
	}
}	