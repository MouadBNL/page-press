import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { EditorElement } from "../types";


type Payload = {
	title: string
}

export class AddDemoElementCommand extends CommandHandler<Payload, EditorElement | null> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<EditorElement | null> {
		const editor = this._context.gjseditor;
		console.log("editor", editor);
		console.log("selected", editor.getSelected());
		const container = editor.getSelected();

		if (!container) return Promise.resolve(null);
		const [el] = container.append(
			`
			<div class="room-card" data-pgpress-component-room-card>
				<h1>${payload.title}</h1>
			</div>
			`
		);

		return el;
	}
}