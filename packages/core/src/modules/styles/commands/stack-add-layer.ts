import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { findProperty } from "../lib";
import { StylePropertyQuery, StackStyleProperty } from "../type";



type Payload = {
	query: StylePropertyQuery;
}

export class StackAddLayerCommand extends CommandHandler<Payload, boolean> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<boolean> {
		console.log('StackAddLayerCommand', payload);
		const property = findProperty(this._context.gjseditor, payload.query);
		if (!property || property.getType() !== 'stack') {
			return Promise.reject(false);
		}
		(property as StackStyleProperty).addLayer({});
		this._context.emit('style:sectors:updated', []);
		return Promise.resolve(true);
	}
}