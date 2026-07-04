import { EditorBlocksPanel } from "./blocks";
import { EditorElementPropertiesPanel } from "./element-properties";
import { EditorElementStylesPanel } from "./element-styles";
import { EditorElementSelectorsPanel } from "./element-selectors";
import { EditorLayersPanel } from "./layers";


export const EditorPanels = {
	Layers: EditorLayersPanel,
	Blocks: EditorBlocksPanel,
	ElementSelectors: EditorElementSelectorsPanel,
	ElementStyles: EditorElementStylesPanel,
	ElementProperties: EditorElementPropertiesPanel,
}