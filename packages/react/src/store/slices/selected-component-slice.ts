import { EditorElement } from "@pagepress/core"
import { StateCreator } from "zustand"
import { EditorStoreSlices } from ".."


export type SelectedComponentSlice = {
	selectedComponent: EditorElement | null,
	setSelectedComponent: (component: EditorElement | null) => void,
}


export const createSelectedComponentSlice: StateCreator<EditorStoreSlices, [], [], SelectedComponentSlice> = (set) => ({
	selectedComponent: null,
	setSelectedComponent(component) {
		set((state) => ({
			selectedComponent: component
		}))
	},
})