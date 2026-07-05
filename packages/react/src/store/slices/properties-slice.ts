import { EditorProperty } from "@pagepress/core";
import { StateCreator } from "zustand";
import { EditorStoreSlices } from "..";



export type PropertySlice = {
	properties: EditorProperty[];

	setProperties: (properties: EditorProperty[]) => void;
}

export const createPropertiesSlice: StateCreator<EditorStoreSlices, [], [], PropertySlice> = (set) => ({
	properties: [],
	setProperties(properties) {
		set((state) => ({
			properties: properties
		}))
	},
})