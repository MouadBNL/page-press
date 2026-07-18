import { EditorCommandRegistry, type EditorContext } from "../../../kernel/types";
import { ComponentListCommand } from "./list";
import { ComponentEditCommand } from "./edit";


export const ComponentCommands = {
	"components:list": (context: EditorContext) => new ComponentListCommand(context),
	"components:edit": (context: EditorContext) => new ComponentEditCommand(context),
} as const satisfies EditorCommandRegistry;