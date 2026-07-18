import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { StylePropertyQuery } from "../type";
import { findProperty } from "../lib";



type Payload = {
	query: StylePropertyQuery;
	value: any;
}




export class SectorPropertySetCommand extends CommandHandler<Payload, boolean> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): boolean {
		console.trace('SectorPropertySetCommand', payload);
		const property = findProperty(this._context.gjseditor, payload.query);
		if (!property) {
			return false;
		}
		property.upValue?.(payload.value);
		return true;
	}
}