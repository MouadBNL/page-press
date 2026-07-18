import { EditorComponentDefinition } from "@pagepress/core/src/modules/components";
import { StateCreator } from "zustand";
import { EditorStoreSlices } from "..";



export type ComponentsSlice = {
	components: EditorComponentDefinition[];
	setComponents: (components: EditorComponentDefinition[]) => void;
}


export const createComponentsSlice: StateCreator<EditorStoreSlices, [], [], ComponentsSlice> = (set) => ({
	components: [],
	setComponents: (components) => {
		set({ components });
	},
})