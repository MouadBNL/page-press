import { useEffect } from "react";
import { useEditor } from "./use-editor";
import { useEditorStore } from "./use-editor-store";
import { debounce } from "../lib/debounce";
import { EditorComponentDefinition } from "@pagepress/core/src/modules/components";



export function useEditorEditComponentSync() {
	const { editor } = useEditor();

	const showPanel = useEditorStore((s) => s.showPanel);
	const hidePanel = useEditorStore((s) => s.hidePanel);
	const setActivityBarPanel = useEditorStore((s) => s.setActivityBarPanel);
	const setEditingComponent = useEditorStore((s) => s.setEditingComponent);
	const clearEditingComponent = useEditorStore((s) => s.clearEditingComponent);

	useEffect(() => {

		const editingHander = debounce(({ component }: { component: EditorComponentDefinition }) => {
			setEditingComponent(component);
			console.log('[useEditorEditComponentSync] component:editing', component);
			showPanel('component-edit');
			setActivityBarPanel('component-edit');
		}, 100);

		const exitHandler = debounce(() => {
			console.log('[useEditorEditComponentSync] exit handler');
			clearEditingComponent();
			hidePanel('component-edit');
			setActivityBarPanel('blocks');
		}, 100);

		editor.on('component:editing', editingHander);
		editor.on('component:edit-failed', exitHandler);
		editor.on('component:edited', exitHandler);
		return () => {
			editor.off('component:editing', editingHander);
			editor.off('component:edit-failed', exitHandler);
			editor.off('component:edited', exitHandler);
		}
	});

	useEffect(() => {
		const handler = debounce(({ component }: { component: EditorComponentDefinition }) => {
			setEditingComponent(component);
		}, 100);
		editor.on('component:update', handler);
		return () => {
			editor.off('component:update', handler);
		};
	}, []);
}