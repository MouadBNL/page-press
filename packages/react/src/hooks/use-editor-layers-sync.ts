import { useEffect } from "react";
import { useEditorStore } from "./use-editor-store";
import { debounce } from "../lib/debounce";
import { useEditor } from "./use-editor";



export function useEditorLayersSync() {
	const { editor } = useEditor();
	const setLayerTree = useEditorStore((s) => s.setLayerTree);

	useEffect(() => {
		const handle = debounce(() => {
			const layerTree = editor.run('layers:get-tree');
			console.log('useEditorLayersSync handle', layerTree);
			setLayerTree(layerTree);
		}, 100);
		handle();
		editor.on('layers:updated', handle);
		return () => {
			editor.off('layers:updated', handle);
		}
	}, []);
}