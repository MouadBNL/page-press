import { StateCreator } from 'zustand';
import { EditorStoreSlices } from '..';
import { EditorComponentDefinition } from '@pagepress/core/src/modules/components';


export type EditComponentSlice = {
	editingComponent: EditorComponentDefinition | null,
	setEditingComponent: (component: EditorComponentDefinition) => void,
	clearEditingComponent: () => void,
}
export const createEditComponentSlice: StateCreator<EditorStoreSlices, [], [], EditComponentSlice> = (set) => ({
	editingComponent: null,
	setEditingComponent: (component) => {
		set((state) => ({
			editingComponent: component,
		}));
	},
	clearEditingComponent: () => {
		set((state) => ({
			editingComponent: null,
		}));
	},
});