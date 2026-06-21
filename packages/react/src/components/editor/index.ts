import { EditorCanvas } from "./canvas";
import { EditorDemo } from "./demo";
import { EditorGate } from "./gate";
import { EditorLayout } from "./layout";
import { EditorPanel } from "./panel";
import { EditorPanels } from "./panels";
import { EditorRoot } from "./root";
import { EditorSidebar } from "./sidebar";


export const Editor = {
	Root: EditorRoot,
	Gate: EditorGate,
	Layout: EditorLayout,
	Sidebar: EditorSidebar,
	Panel: EditorPanel,
	Panels: EditorPanels,
	Canvas: EditorCanvas,
	Demo: EditorDemo,
}