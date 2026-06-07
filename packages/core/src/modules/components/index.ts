import { EditorCommandRegistry, EditorContext } from "../../kernel/types";
import { ComponentAddDemoCommand } from "./commands/add-demo";
import { ComponentSelectCommand } from "./commands/select";
import { ComponentSelectedEvent } from "./events/selected";

export type ComponentEvents = ComponentSelectedEvent;


export const ComponentCommands = {
	"components:select": (context: EditorContext) => new ComponentSelectCommand(context),
	"components:add-demo": (context: EditorContext) => new ComponentAddDemoCommand(context),
} as const satisfies EditorCommandRegistry;