import { Component } from "@pagepress/core/src/kernel/types"
import { StateCreator } from "zustand"
import { EditorStoreSlices } from ".."


export type SelectedComponentSlice = {
	selectedComponent: Component | null,
	setSelectedComponent: (component: Component | null) => void,
}


export const createSelectedComponentSlice: StateCreator<EditorStoreSlices, [], [], SelectedComponentSlice> = (set) => ({
	selectedComponent: null,
	setSelectedComponent(component) {
		set((state) => ({
			selectedComponent: component
		}))
	},
})