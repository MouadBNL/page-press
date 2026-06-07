import { CommandBus, CommandHandler } from "../lib/command-bus";
import { ComponentCommands } from "../modules/components";
import { EditorContext } from "./types";


const commands = {
	...ComponentCommands
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
