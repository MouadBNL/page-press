import { SectorListCommand } from "./list";
import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { SectorPropertySetCommand } from "./property-set";
import { StackAddLayerCommand } from "./stack-add-layer";
import { StackSetSelectedLayerCommand } from "./stack-set-selected-layer";
import { GetSelectedLayerCommand } from "./get-selected-layer";
import { StackRemoveLayerCommand } from "./stack-remove-layer";


export const SectorCommands = {
	"sectors:list": (context: EditorContext) => new SectorListCommand(context),
	"style:property:set": (context: EditorContext) => new SectorPropertySetCommand(context),
	"style:stack:add-layer": (context: EditorContext) => new StackAddLayerCommand(context),
	"style:stack:remove-layer": (context: EditorContext) => new StackRemoveLayerCommand(context),
	"style:stack:set-selected-layer": (context: EditorContext) => new StackSetSelectedLayerCommand(context),
	"style:stack:get-selected-layer": (context: EditorContext) => new GetSelectedLayerCommand(context),
}as const satisfies EditorCommandRegistry;	