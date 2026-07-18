import { createStore } from "zustand";
import { createActivityBarSlice, ActivityBarSlice } from "./slices/activity-bar-slice";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebar-slice";
import { createSelectedComponentSlice, SelectedComponentSlice } from "./slices/selected-component-slice";
import { createSelectorsSlice, SelectorsSlice } from "./slices/selectors-slice";
import { createSectorsSlice, SectorsSlice } from "./slices/sectors-slice";
import { createLayersSlice, LayersSlice } from "./slices/layers-slice";
import { createPropertiesSlice, PropertySlice } from "./slices/properties-slice";
import { createEditComponentSlice, EditComponentSlice } from "./slices/edit-component-slice";

export type EditorStoreSlices = 
& ActivityBarSlice 
& SidebarSlice
& SelectedComponentSlice
& SelectorsSlice
& SectorsSlice
& LayersSlice
& PropertySlice
& EditComponentSlice;



export function createEditorStore() {
	return createStore<EditorStoreSlices>()((...args) => ({
		...createActivityBarSlice(...args),
		...createSidebarSlice(...args),
		...createSelectedComponentSlice(...args),
		...createSelectorsSlice(...args),
		...createSectorsSlice(...args),
		...createLayersSlice(...args),
		...createPropertiesSlice(...args),
		...createEditComponentSlice(...args),
	}))
}


export type EditorStore = ReturnType<typeof createEditorStore>;