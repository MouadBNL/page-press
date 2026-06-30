import { EditorBlocksPanel } from "./blocks";
import { EditorElementSettingsPanel } from "./element-settings";
import { EditorElementStylesPanel } from "./element-styles";
import { EditorElementSelectorsPanel } from "./element-selectors";
import { EditorLayersPanel } from "./layers";


export const EditorPanels = {
	Layers: EditorLayersPanel,
	Blocks: EditorBlocksPanel,
	ElementSelectors: EditorElementSelectorsPanel,
	ElementStyles: EditorElementStylesPanel,
	ElementSettings: EditorElementSettingsPanel,
}