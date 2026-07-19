import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { EditorComponentDefinition } from "../types";


type Payload = {
	component: EditorComponentDefinition;
}
export class ComponentListAddCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): void {
		const { component } = payload;
		this._context.componentManager().add(component);
	}
}