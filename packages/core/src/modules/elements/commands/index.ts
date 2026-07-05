import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { AddDemoElementCommand } from "./add-demo";
import { ElementSelectCommand } from "./select";

export const ElementCommands = {
	"elements:select": (context: EditorContext) => new ElementSelectCommand(context),
	"elements:add-demo": (context: EditorContext) => new AddDemoElementCommand(context),
} as const satisfies EditorCommandRegistry;