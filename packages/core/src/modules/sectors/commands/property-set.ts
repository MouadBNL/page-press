import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";


type Payload = {
	property: string;
	value: any;
}

export class SectorPropertySetCommand extends CommandHandler<Payload, boolean> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(payload: Payload): Promise<boolean> {
		console.log('SectorPropertySetCommand', payload);
		const editor = this._context.gjseditor;
		for (const sector of editor.StyleManager.getSectors({ visible: true })) {
			for (const property of sector.getProperties()) {
				if (String(property.getId()) === payload.property) {
					(property as { upValue?: (value: string) => void }).upValue?.(payload.value);
					return Promise.resolve(true);
				}
			}
		}
		return Promise.reject(false);
	}
}