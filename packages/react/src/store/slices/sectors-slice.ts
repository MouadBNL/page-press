import { StateCreator } from "zustand";
import { EditorStoreSlices } from "..";
import { EditorStyleSector } from "@pagepress/core";


export type SectorsSlice = {
	sectors: EditorStyleSector[];
	setSectors: (sectors: EditorStyleSector[]) => void;
}

export const createSectorsSlice: StateCreator<EditorStoreSlices, [], [], SectorsSlice> = (set) => ({
	sectors: [],
	setSectors: (sectors) => set({ sectors }),
});