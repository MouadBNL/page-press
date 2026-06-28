import { createStore } from "zustand";
import { createActivityBarSlice, ActivityBarSlice } from "./slices/activity-bar-slice";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebar-slice";
import { createSelectedComponentSlice, SelectedComponentSlice } from "./slices/selected-component-slice";
import { createSelectorsSlice, SelectorsSlice } from "./slices/selectors-slice";
import { createSectorsSlice, SectorsSlice } from "./slices/sectors-slice";

export type EditorStoreSlices = 
& ActivityBarSlice 
& SidebarSlice
& SelectedComponentSlice
& SelectorsSlice
& SectorsSlice;


export function createEditorStore() {
	return createStore<EditorStoreSlices>()((...args) => ({
		...createActivityBarSlice(...args),
		...createSidebarSlice(...args),
		...createSelectedComponentSlice(...args),
		...createSelectorsSlice(...args),
		...createSectorsSlice(...args),
	}))
}


export type EditorStore = ReturnType<typeof createEditorStore>;