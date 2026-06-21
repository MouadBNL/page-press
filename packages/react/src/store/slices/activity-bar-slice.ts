import { StateCreator } from 'zustand';
import { EditorStoreSlices } from '..';


type PanelId = string;
export type ActivityBarSlice = {
	activityBarPanel: PanelId | null,
	setActivityBarPanel: (panelId: PanelId) => void,
	toggleActivityBarPanel: (panelId: PanelId) => void,
}
export const createActivityBarSlice: StateCreator<EditorStoreSlices, [], [], ActivityBarSlice> = (set) => ({
	activityBarPanel: null,
	
	setActivityBarPanel: (panelId) => {
		set((state) => ({
			activityBarPanel: panelId,
		}));
	},
	toggleActivityBarPanel: (panelId) => {
		set((state) => ({
			activityBarPanel: state.activityBarPanel === panelId ?  null : panelId
		}));
	},
});