import { StateCreator } from 'zustand';
import { EditorStore, EditorStoreSlices } from '..';


type PanelId = string;
export type LeftSidebarSlice = {
	leftSiderbarPanel: PanelId | null,
	setLeftSiderbarPanel: (panelId: PanelId) => void,
	toggleLeftSiderbarPanel: (panelId: PanelId) => void,
}
export const createLeftSidebarSlice: StateCreator<EditorStoreSlices, [], [], LeftSidebarSlice> = (set) => ({
	leftSiderbarPanel: null,
	
	setLeftSiderbarPanel: (panelId) => {
		set((state) => ({
			leftSiderbarPanel: panelId,
		}));
	},
	toggleLeftSiderbarPanel: (panelId) => {
		set((state) => ({
			leftSiderbarPanel: state.leftSiderbarPanel === panelId ?  null : panelId
		}));
	},
});