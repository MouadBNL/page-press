import { useEffect } from "react";
import { useEditor } from "./use-editor";
import { useEditorStore } from "./use-editor-store";
import { EditorElement } from "@pagepress/core";




export function useEditorSelectedSync() {

	const { editor } = useEditor();
	const selectedComponent = useEditorStore((s) => s.selectedComponent);
	const setSelectedComponent = useEditorStore((s) => s.setSelectedComponent);


	useEffect(() => {
		const handlechange = (component: EditorElement) => {
			if (component.cid == selectedComponent?.cid) return;
			setSelectedComponent(component);
		}
		editor.on('elements:selected', handlechange);
		return () => editor.off('elements:selected', handlechange);
	}, []);

	useEffect(() => {
		if (!selectedComponent) return;
		editor.run('elements:select', { element: selectedComponent })
	}, [selectedComponent])
}