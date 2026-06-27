import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { AddSelectedCommand } from "./add-selected";
import { GetSelectedCommand } from "./get-selected";
import { RemoveSelectedCommand } from "./remove-selected";



export const SelectorCommands = {
	"selectors:get-selected": (context: EditorContext) => new GetSelectedCommand(context),
	"selectors:add-selected": (context: EditorContext) => new AddSelectedCommand(context),
	"selectors:remove-selected": (context: EditorContext) => new RemoveSelectedCommand(context),
} as const satisfies EditorCommandRegistry;