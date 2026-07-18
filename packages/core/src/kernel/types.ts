import { type Editor as GjsEditor, type Component as GjsComponent } from "grapesjs";
import { CommandHandler } from "../lib/command-bus";
import { EditorEventBus } from "./events";
import { EditorCommandBus } from "./commands";
import { BlockDefinition, BlockManager } from "../modules/blocks";
import { ComponentManager, EditorComponentDefinition } from "../modules/components";
import { Editor } from "./editor";


export type EditorContext = {
	 /** @unstable escape hatch — raw GrapesJS. Migrate calls off this onto curated methods over time. */
	gjseditor: GjsEditor;
	editor: Editor;
	emit: EditorEventBus['emit'];
	run: EditorCommandBus['dispatch'];

	blockManager: () => BlockManager;
	componentManager: () =>ComponentManager;
}


export type EditorOptions = {
	container: HTMLElement,
	blocks?: BlockDefinition[],
	components?: EditorComponentDefinition[],
}



export type EditorCommandRegistry = Record<string, (ctx: EditorContext) => CommandHandler<any, any>>;