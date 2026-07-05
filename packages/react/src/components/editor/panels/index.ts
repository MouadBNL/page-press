import { EditorBlocksPanel } from "./blocks";
import { EditorPropertiesPanel } from "./properties";
import { EditorStylesPanel } from "./styles";
import { EditorSelectorsPanel } from "./selectors";
import { EditorLayersPanel } from "./layers";


export const EditorPanels = {
	Layers: EditorLayersPanel,
	Blocks: EditorBlocksPanel,
	ElementSelectors: EditorSelectorsPanel,
	ElementStyles: EditorStylesPanel,
	ElementProperties: EditorPropertiesPanel,
}