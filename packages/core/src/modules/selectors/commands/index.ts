import { EditorCommandRegistry, EditorContext } from "../../../kernel/types";
import { AddSelectedCommand } from "./add-selected";
import { DisableSelectorCommand } from "./disable";
import { EnableSelectorCommand } from "./enable";
import { GetSelectedCommand } from "./get-selected";
import { GetSelectorToStyleCommand } from "./get-slector-to-style";
import { RemoveSelectedCommand } from "./remove-selected";



export const SelectorCommands = {
	"selectors:get-selected": (context: EditorContext) => new GetSelectedCommand(context),
	"selectors:add-selected": (context: EditorContext) => new AddSelectedCommand(context),
	"selectors:remove-selected": (context: EditorContext) => new RemoveSelectedCommand(context),
	"selectors:enable": (context: EditorContext) => new EnableSelectorCommand(context),
	"selectors:disable": (context: EditorContext) => new DisableSelectorCommand(context),
	"selectors:get-selector-to-style": (context: EditorContext) => new GetSelectorToStyleCommand(context),
} as const satisfies EditorCommandRegistry;