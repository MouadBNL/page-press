import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";


type Payload = {
	componentId: string,
}
export class ComponentDragStartCommand extends CommandHandler<Payload, void> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	handle(payload: Payload): void {
		const component = this._context.componentManager().get(payload.componentId);
		console.log('component', component);
		if(!component) {
			console.warn(`Could not find component with id ${payload.componentId}.`);
			return;
		}

		const editor = this._context.gjseditor;
		editor.Canvas.startDrag({
			content: { type : component.id },
		});
		return;
	}
}