import { SectorListCommand } from "./list";
import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { SectorPropertySetCommand } from "./property-set";


export const SectorCommands = {
	"sectors:list": (context: EditorContext) => new SectorListCommand(context),
	"style:property:set": (context: EditorContext) => new SectorPropertySetCommand(context),
}as const satisfies EditorCommandRegistry;	