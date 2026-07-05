import { useEffect } from "react";
import { useEditor } from "./use-editor";
import { useEditorStore } from "./use-editor-store";


export function useEditorSelectorsSync() {
	const { editor } = useEditor();
	const selectors = useEditorStore((s) => s.selectors);
	const setSelectors = useEditorStore((s) => s.setSelectors);

	
	useEffect(() => {
		const handlechange = () => {
			console.log('useEditorSelectorsSync handlechange')
			const selectors = editor.run('selectors:get-selected', {}).then(selectors => {
				console.log('useEditorSelectorsSync handlechange', selectors)
				setSelectors(selectors);
			});
		}
		editor.on('elements:selected', handlechange);
		editor.on('selectors:updated', handlechange);
		return () => {
			editor.off('elements:selected', handlechange);
			editor.off('selectors:updated', handlechange);
		}
	}, []);

}