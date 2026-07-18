import { CommandHandler } from "../../../lib/command-bus";
import { EditorContext } from "../../../kernel/types";
import { EditorComponentDefinition } from "../types";

export type ComponentUpdateCommandPayload = {
	id: string,
	component: EditorComponentDefinition,
}
export class ComponentUpdateCommand extends CommandHandler<ComponentUpdateCommandPayload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: ComponentUpdateCommandPayload): Promise<void> {
		this._context.componentManager().update(payload.id, payload.component);
	}
}