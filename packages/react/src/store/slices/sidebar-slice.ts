import { StateCreator } from 'zustand';
import { EditorStore, EditorStoreSlices } from '..';
import { SidebarPanels } from '../../types';


export type SidebarSlice = {
	sidebarPanel: SidebarPanels,
	setSidebarPanel: (panelId: SidebarPanels) => void,
	toggleSidebarPanel: (panelId: SidebarPanels) => void,
}
export const createSidebarSlice: StateCreator<EditorStoreSlices, [], [], SidebarSlice> = (set) => ({
	sidebarPanel: 'element-styles',
	
	setSidebarPanel: (panelId) => {
		set((state) => ({
			sidebarPanel: panelId,
		}));
	},
	toggleSidebarPanel: (panelId) => {
		set((state) => ({
			sidebarPanel: panelId
		}));
	},
});