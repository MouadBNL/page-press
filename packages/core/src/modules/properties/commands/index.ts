import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { GetSelectedElementPropertiesCommand } from "./get-selected";





export const PropertiesCommands = {
	"properties:get-selected": (context: EditorContext) => new GetSelectedElementPropertiesCommand(context),
} as const satisfies EditorCommandRegistry;


