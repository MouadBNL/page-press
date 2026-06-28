import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { Sector } from "../type";
import { Sector as GjsSector } from "grapesjs";

export class SectorListCommand extends CommandHandler<void, Sector[]> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(): Promise<Sector[]> {
		const editor = this._context.gjseditor;
		const manager = editor.StyleManager;
		return (manager.getSectors() ?? []).map((sector: GjsSector) => ({
			id: sector.getId(),
			name: sector.getName(),
			properties: sector.getProperties(),
		} satisfies Sector));
	}
}