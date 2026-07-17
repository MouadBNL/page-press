import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { SpotlightDisabledCommand } from "./spotlight-disabled";
import { SpotlightEnableCommand } from "./spotlight-enable";





export const CommonCommands = {
	"spotlight:enable": (context: EditorContext) => new SpotlightEnableCommand(context),
	"spotlight:disable": (context: EditorContext) => new SpotlightDisabledCommand(context),
} as const satisfies EditorCommandRegistry;


