import { useEffect } from "react";
import { useEditorStore } from "./use-editor-store";
import { useEditor } from "./use-editor";
import { debounce } from "../lib/debounce";




export function useEditorPropertiesSync() {
	const { editor } = useEditor();
	const setProperties = useEditorStore((s) => s.setProperties);

	useEffect(() => {
		const handle = debounce(() => {
			const properties = editor.run('properties:selected')
			console.log('useEditorPropertiesSync handle', properties);
			setProperties(properties);
		}, 100);
		handle();
		editor.on('elements:selected', handle);
		editor.on('component:update', handle);
		return () => {
			editor.off('elements:selected', handle);
			editor.off('component:update', handle);
		}
	}, []);
}