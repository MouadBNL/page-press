import { EditorCommandRegistry, type EditorContext } from "../../../kernel/types";
import { ComponentListCommand } from "./list";


export const ComponentCommands = {
	"components:list": (context: EditorContext) => new ComponentListCommand(context),
} as const satisfies EditorCommandRegistry;