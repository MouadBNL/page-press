import { StateCreator } from 'zustand';
import { EditorStore, EditorStoreSlices } from '..';


type PanelId = string;
export type RightSidebarSlice = {
	rightSiderbarPanel: PanelId | null,
	setRightSiderbarPanel: (panelId: PanelId) => void,
	toggleRightSiderbarPanel: (panelId: PanelId) => void,
}
export const createRightSidebarSlice: StateCreator<EditorStoreSlices, [], [], RightSidebarSlice> = (set) => ({
	rightSiderbarPanel: null,
	
	setRightSiderbarPanel: (panelId) => {
		set((state) => ({
			rightSiderbarPanel: panelId,
		}));
	},
	toggleRightSiderbarPanel: (panelId) => {
		set((state) => ({
			rightSiderbarPanel: state.rightSiderbarPanel === panelId ?  null : panelId
		}));
	},
});