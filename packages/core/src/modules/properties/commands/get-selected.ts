import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { EditorProperty } from "../types";



type Payload = void;

export class GetSelectedElementPropertiesCommand extends CommandHandler<Payload, EditorProperty[]> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): EditorProperty[] {
		const editor = this._context.gjseditor;
		console.log('LayerToggleVisibilityCommand', payload);
		const traits = editor.Traits.getTraits();
		return traits;
	}
}