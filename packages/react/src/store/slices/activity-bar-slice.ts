import { StateCreator } from 'zustand';
import { EditorStoreSlices } from '..';


type PanelId = string;
export type ActivityBarSlice = {
	activityBarPanel: PanelId | null,
	hiddenPanels: Set<PanelId>,
	setActivityBarPanel: (panelId: PanelId) => void,
	toggleActivityBarPanel: (panelId: PanelId) => void,
	hidePanel: (panelId: PanelId) => void,
	showPanel: (panelId: PanelId) => void,
	togglePanelVisibility: (panelId: PanelId) => void,
}

export const createActivityBarSlice: StateCreator<EditorStoreSlices, [], [], ActivityBarSlice> = (set) => ({
	activityBarPanel: null,
	hiddenPanels: new Set(['component-edit']),
	
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

	hidePanel: (panelId) => {
		set((state) => ({
			hiddenPanels: new Set([...state.hiddenPanels, panelId]),
		}));
	},
	showPanel: (panelId) => {
		set((state) => ({
			hiddenPanels: new Set([...state.hiddenPanels].filter((id) => id !== panelId)),
		}));
	},
	togglePanelVisibility: (panelId) => {
		set((state) => ({
			hiddenPanels: state.hiddenPanels.has(panelId) ? new Set([...state.hiddenPanels].filter((id) => id !== panelId)) : new Set([...state.hiddenPanels, panelId]),
		}));
	},
});