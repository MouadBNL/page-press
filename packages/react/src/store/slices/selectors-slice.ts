import { Selector } from "@pagepress/core";
import { EditorStoreSlices } from "..";
import { StateCreator } from "zustand";


export type SelectorsSlice = {
	selectors: Selector[],
	setSelectors: (selectors: Selector[]) => void,
}

export const createSelectorsSlice: StateCreator<EditorStoreSlices, [], [], SelectorsSlice> = (set) => ({
	selectors: [],
	setSelectors: (selectors) => {
		set((state) => ({
			selectors: selectors,
		}));
	},
})