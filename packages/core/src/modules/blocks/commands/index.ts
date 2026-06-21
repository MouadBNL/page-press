import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { BlockDragEndCommand } from "./drag-end";
import { BlockDragStartCommand } from "./drag-start";
import { BlockListCommand } from "./list";
import { BlockLoadCommand } from "./load";





export const BlockCommands = {
	"blocks:load": (context: EditorContext) => new BlockLoadCommand(context),
	"blocks:list": (context: EditorContext) => new BlockListCommand(context),
	"blocks:drag-start": (context: EditorContext) => new BlockDragStartCommand(context),
	"blocks:drag-end": (context: EditorContext) => new BlockDragEndCommand(context),
} as const satisfies EditorCommandRegistry;


