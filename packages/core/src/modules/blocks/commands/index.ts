import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { BlockListCommand } from "./list";
import { BlockLoadCommand } from "./load";





export const BlockCommands = {
	"blocks:load": (context: EditorContext) => new BlockLoadCommand(context),
	"blocks:list": (context: EditorContext) => new BlockListCommand(context),
} as const satisfies EditorCommandRegistry;


