import { EditorCommandRegistry, type EditorContext } from "../../../kernel/types";
import { ComponentListCommand } from "./list";
import { ComponentEditCommand } from "./edit";
import { ComponentUpdateCommand } from "./update";


export const ComponentCommands = {
	"components:list": (context: EditorContext) => new ComponentListCommand(context),
	"components:edit": (context: EditorContext) => new ComponentEditCommand(context),
	"components:update": (context: EditorContext) => new ComponentUpdateCommand(context),
} as const satisfies EditorCommandRegistry;