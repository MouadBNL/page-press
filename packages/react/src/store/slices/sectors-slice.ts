import { StateCreator } from "zustand";
import { EditorStoreSlices } from "..";
import { Sector } from "@pagepress/core";


export type SectorsSlice = {
	sectors: Sector[];
	setSectors: (sectors: Sector[]) => void;
}

export const createSectorsSlice: StateCreator<EditorStoreSlices, [], [], SectorsSlice> = (set) => ({
	sectors: [],
	setSectors: (sectors) => set({ sectors }),
});