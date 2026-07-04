import { ComponentProperty } from "@pagepress/core";
import { StateCreator } from "zustand";
import { EditorStoreSlices } from "..";



export type ComponentPropertySlice = {
	properties: ComponentProperty[];

	setProperties: (properties: ComponentProperty[]) => void;
}

export const createComponentPropertiesSlice: StateCreator<EditorStoreSlices, [], [], ComponentPropertySlice> = (set) => ({
	properties: [],
	setProperties(properties) {
		set((state) => ({
			properties: properties
		}))
	},
})