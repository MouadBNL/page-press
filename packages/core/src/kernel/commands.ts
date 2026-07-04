import { CommandBus, CommandHandler } from "../lib/command-bus";
import { BlockCommands } from "../modules/blocks";
import { ComponentCommands } from "../modules/components";
import { EditorContext } from "./types";
import { SelectorCommands } from "../modules/selectors";
import { SectorCommands } from "../modules/sectors";
import { LayerCommands } from "../modules/layers";
import { PropertiesCommands } from "../modules/properties";


const commands = {
	...ComponentCommands,
	...BlockCommands,
	...SelectorCommands,
	...SectorCommands,
	...LayerCommands,
	...PropertiesCommands,
}

export type EditorCommandMap = {
  [K in keyof typeof commands]: ReturnType<typeof commands[K]>;
};

export type EditorCommandBus = CommandBus<EditorCommandMap>;


export function createEditorCommandBus(): EditorCommandBus {
	return new CommandBus<EditorCommandMap>();
}


export function registerEditorCommandHandlers(bus: EditorCommandBus, context: EditorContext) {
	for (const [key, factory] of Object.entries(commands)) {
		const handler: CommandHandler<any, any> = factory(context)
		bus.register(key as any, handler);
	}
}
