import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { EditorStyleSector } from "../type";
import { Sector as GjsSector } from "grapesjs";

export class SectorListCommand extends CommandHandler<void, EditorStyleSector[]> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(): Promise<EditorStyleSector[]> {
		const editor = this._context.gjseditor;
		const manager = editor.StyleManager;
		return (manager.getSectors() ?? []).map((sector: GjsSector) => ({
			id: sector.getId(),
			name: sector.getName(),
			properties: sector.getProperties(),
			visible: sector.isVisible(),
		} satisfies EditorStyleSector));
	}
}