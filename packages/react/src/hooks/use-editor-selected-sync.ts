import { useEffect } from "react";
import { useEditor } from "./use-editor";
import { useEditorStore } from "./use-editor-store";
import { Component } from "@pagepress/core/src/kernel/types";




export function useEditorSelectedSync() {

	const { editor } = useEditor();
	const selectedComponent = useEditorStore((s) => s.selectedComponent);
	const setSelectedComponent = useEditorStore((s) => s.setSelectedComponent);


	useEffect(() => {
		console.log('useEditorSelectedSync setup')
		const handlechange = (component: Component) => {
			if (component.cid == selectedComponent?.cid) return;
			setSelectedComponent(component);
		}
		editor.on('components:selected', handlechange);
		return () => editor.off('components:selected', handlechange);
	}, []);

	useEffect(() => {
		if (!selectedComponent) return;
		editor.run('components:select', { component: selectedComponent })
	}, [selectedComponent])
}