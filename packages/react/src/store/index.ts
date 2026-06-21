import { createStore } from "zustand";
import { createLeftSidebarSlice, LeftSidebarSlice } from "./slices/left-sidebar-slice";
import { createRightSidebarSlice, RightSidebarSlice } from "./slices/right-sidebar-slice";
import { createPanelsSlice, PanelsSlice } from "./slices/panels-slice";

export type EditorStoreSlices = 
& LeftSidebarSlice 
& RightSidebarSlice
& PanelsSlice;

export function createEditorStore() {
	return createStore<EditorStoreSlices>()((...args) => ({
		...createLeftSidebarSlice(...args),
		...createRightSidebarSlice(...args),
		...createPanelsSlice(...args),
	}))
}


export type EditorStore = ReturnType<typeof createEditorStore>;