import { useEffect } from "react";
import { useEditorStore } from "./use-editor-store";
import { useEditor } from "./use-editor";
import { debounce } from "../lib/debounce";




export function useEditorPropertiesSync() {
	const { editor } = useEditor();
	const setProperties = useEditorStore((s) => s.setProperties);

	useEffect(() => {
		const handle = debounce(() => {
			editor.run('properties:selected').then(properties => {
				console.log('useEditorPropertiesSync handle', properties);
				setProperties(properties);
			});
		}, 100);
		handle();
		editor.on('elements:selected', handle);
		return () => {
			editor.off('elements:selected', handle);
		}
	}, []);
}