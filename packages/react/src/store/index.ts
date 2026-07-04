import { createStore } from "zustand";
import { createActivityBarSlice, ActivityBarSlice } from "./slices/activity-bar-slice";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebar-slice";
import { createSelectedComponentSlice, SelectedComponentSlice } from "./slices/selected-component-slice";
import { createSelectorsSlice, SelectorsSlice } from "./slices/selectors-slice";
import { createSectorsSlice, SectorsSlice } from "./slices/sectors-slice";
import { createLayersSlice, LayersSlice } from "./slices/layers-slice";
import { createComponentPropertiesSlice, ComponentPropertySlice } from "./slices/component-properties-slice";

export type EditorStoreSlices = 
& ActivityBarSlice 
& SidebarSlice
& SelectedComponentSlice
& SelectorsSlice
& SectorsSlice
& LayersSlice
& ComponentPropertySlice;



export function createEditorStore() {
	return createStore<EditorStoreSlices>()((...args) => ({
		...createActivityBarSlice(...args),
		...createSidebarSlice(...args),
		...createSelectedComponentSlice(...args),
		...createSelectorsSlice(...args),
		...createSectorsSlice(...args),
		...createLayersSlice(...args),
		...createComponentPropertiesSlice(...args),
	}))
}


export type EditorStore = ReturnType<typeof createEditorStore>;