import { type Editor as GjsEditor, type Component as GjsComponent } from "grapesjs";
import { CommandHandler } from "../lib/command-bus";
import { EditorEventBus } from "./events";
import { EditorCommandBus } from "./commands";
import { BlockDefinition, BlockManager } from "../modules/blocks";


export type EditorContext = {
	 /** @unstable escape hatch — raw GrapesJS. Migrate calls off this onto curated methods over time. */
	gjseditor: GjsEditor;
	emit: EditorEventBus['emit'];
	run: EditorCommandBus['dispatch'];

	blockManager: BlockManager;
}


export type EditorOptions = {
	container: HTMLElement,
	blocks?: BlockDefinition[],
}



export type EditorCommandRegistry = Record<string, (ctx: EditorContext) => CommandHandler<any, any>>;