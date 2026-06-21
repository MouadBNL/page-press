import { createStore } from "zustand";
import { createActivityBarSlice, ActivityBarSlice } from "./slices/activity-bar-slice";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebar-slice";

export type EditorStoreSlices = 
& ActivityBarSlice 
& SidebarSlice

export function createEditorStore() {
	return createStore<EditorStoreSlices>()((...args) => ({
		...createActivityBarSlice(...args),
		...createSidebarSlice(...args),
	}))
}


export type EditorStore = ReturnType<typeof createEditorStore>;