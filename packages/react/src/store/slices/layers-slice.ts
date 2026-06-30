import { LayerTreeNode } from "@pagepress/core";
import { StateCreator } from "zustand";
import { EditorStoreSlices } from "..";


export type LayersSlice = {
	layerTree: LayerTreeNode | null;
	setLayerTree: (layerTree: LayerTreeNode | null) => void;
}

export const createLayersSlice: StateCreator<EditorStoreSlices, [], [], LayersSlice> = (set) => ({
	layerTree: null,
	setLayerTree: (layerTree) => {
		set((state) => ({
			layerTree: layerTree,
		}));
	},
});