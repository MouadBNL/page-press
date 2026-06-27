import { createStore } from "zustand";
import { createActivityBarSlice, ActivityBarSlice } from "./slices/activity-bar-slice";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebar-slice";
import { createSelectedComponentSlice, SelectedComponentSlice } from "./slices/selected-component-slice";

export type EditorStoreSlices = 
& ActivityBarSlice 
& SidebarSlice
& SelectedComponentSlice;



export function createEditorStore() {
	return createStore<EditorStoreSlices>()((...args) => ({
		...createActivityBarSlice(...args),
		...createSidebarSlice(...args),
		...createSelectedComponentSlice(...args),
	}))
}


export type EditorStore = ReturnType<typeof createEditorStore>;