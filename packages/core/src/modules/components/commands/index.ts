import { EditorCommandRegistry, type EditorContext } from "../../../kernel/types";
import { ComponentListCommand } from "./list";
import { ComponentEditCommand } from "./edit";
import { ComponentUpdateCommand } from "./update";
import { ComponentDragStartCommand } from "./drag-start";
import { ComponentDragEndCommand } from "./drag-end";
import { ComponentListAddCommand } from "./list-add";
import { ComponentPropertyAddCommand } from "./property-add";

export const ComponentCommands = {
	"components:drag-start": (context: EditorContext) => new ComponentDragStartCommand(context),
	"components:drag-end": (context: EditorContext) => new ComponentDragEndCommand(context),	
	"components:edit": (context: EditorContext) => new ComponentEditCommand(context),
	"components:update": (context: EditorContext) => new ComponentUpdateCommand(context),
	
	"components:list": (context: EditorContext) => new ComponentListCommand(context),
	"components:list:add": (context: EditorContext) => new ComponentListAddCommand(context),

	"components:property:add": (context: EditorContext) => new ComponentPropertyAddCommand(context),
} as const satisfies EditorCommandRegistry;