import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { AddDemoElementCommand } from "./add-demo";
import { ElementGetSelectedCommand } from "./get-selected";
import { ElementSelectCommand } from "./select";

export const ElementCommands = {
	"elements:select": (context: EditorContext) => new ElementSelectCommand(context),
	"elements:add-demo": (context: EditorContext) => new AddDemoElementCommand(context),
	"elements:get-selected": (context: EditorContext) => new ElementGetSelectedCommand(context),
} as const satisfies EditorCommandRegistry;