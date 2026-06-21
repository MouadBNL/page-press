import { StateCreator } from "zustand"
import { EditorStoreSlices } from ".."



export type PanelsSlice = {
	panels: Set<string>,
	registerPanel: (panelId: string) => void,
}


export const createPanelsSlice: StateCreator<EditorStoreSlices, [], [], PanelsSlice> = ((set) => ({
	panels: new Set<string>(),
	registerPanel(panelId) {
		set((state) => {
			state.panels.add(panelId)
			return ({
				panels: state.panels
			})
		})
	},
}))