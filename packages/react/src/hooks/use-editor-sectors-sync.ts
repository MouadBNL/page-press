import { useEffect } from "react";
import { useEditorStore } from "./use-editor-store";
import { useEditor } from "./use-editor";
import { debounce } from "../lib/debounce";



export function useEditorSectorsSync() {

	const { editor } = useEditor();
	const setSectors = useEditorStore(s => s.setSectors);

	const handle = debounce(() => {
		console.log('useEditorSectorsSync handle');
		editor.run('sectors:list', {}).then(sectors => {
			setSectors(sectors);
		});
	}, 100);

	useEffect(() => {

		handle();
		editor.on('sectors:ready', handle);
		editor.on('sectors:updated', handle);
		editor.on('components:selected', handle);

		return () => {
			editor.off('sectors:ready', handle);
			editor.off('sectors:updated', handle);
			editor.off('components:selected', handle);
		}
	}, [editor]);
}

