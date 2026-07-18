import { EditorBlocksPanel } from "./blocks";
import { EditorPropertiesPanel } from "./properties";
import { EditorStylesPanel } from "./styles";
import { EditorSelectorsPanel } from "./selectors";
import { EditorLayersPanel } from "./layers";
import { EditorComponentEditPanel } from "./component-edit";
import { EditorComponentsPanel } from "./components";


export const EditorPanels = {
	Layers: EditorLayersPanel,
	Blocks: EditorBlocksPanel,
	Components: EditorComponentsPanel,
	ComponentEdit: EditorComponentEditPanel,
	ElementSelectors: EditorSelectorsPanel,
	ElementStyles: EditorStylesPanel,
	ElementProperties: EditorPropertiesPanel,
}