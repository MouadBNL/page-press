import { EditorCommandRegistry } from "../../../kernel/types";
import { EditorContext } from "../../../kernel/types";
import { LayerGetTreeCommand } from "./get-tree";
import { LayerHoverCommand } from "./hover";
import { LayerToggleExpandCommand } from "./toggle-expand";
import { LayerToggleVisibilityCommand } from "./toggle-visibility";
import { LayerToggleLockCommand } from "./toggle-lock";




export const LayerCommands = {
	"layers:get-tree": (context: EditorContext) => new LayerGetTreeCommand(context),
	"layers:hover": (context: EditorContext) => new LayerHoverCommand(context),
	"layers:toggle-visibility": (context: EditorContext) => new LayerToggleVisibilityCommand(context),
	"layers:toggle-expand": (context: EditorContext) => new LayerToggleExpandCommand(context),
	"layers:toggle-lock": (context: EditorContext) => new LayerToggleLockCommand(context),
} as const satisfies EditorCommandRegistry;


