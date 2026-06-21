import { EditorActivityBar } from "./activity-bar";
import { EditorCanvas } from "./canvas";
import { EditorDemo } from "./demo";
import { EditorGate } from "./gate";
import { EditorLayout } from "./layout";
import { ActivityBarItem } from "./activity-bar-item";
import { EditorPanels } from "./panels";
import { EditorRoot } from "./root";
import { EditorSidebar } from "./sidebar";
import { EditorSidebarHeader } from "./sidebar-header";
import { EditorSidebarTabs } from "./sidebar-tabs";
import { EditorSidebarTabItem } from "./sidebar-tab-item";


export const Editor = {
	Root: EditorRoot,
	Gate: EditorGate,
	Layout: EditorLayout,
	Canvas: EditorCanvas,
	Demo: EditorDemo,

	ActivityBar: EditorActivityBar,
	ActivityBarItem: ActivityBarItem,

	Sidebar: EditorSidebar,
	SidebarHeader: EditorSidebarHeader,
	SidebarTabs: EditorSidebarTabs,
	SidebarTabItem: EditorSidebarTabItem,


	Panels: EditorPanels,
}