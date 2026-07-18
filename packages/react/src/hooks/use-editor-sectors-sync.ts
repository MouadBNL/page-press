import { useEffect } from "react";
import { useEditorStore } from "./use-editor-store";
import { useEditor } from "./use-editor";
import { debounce } from "../lib/debounce";



export function useEditorSectorsSync() {

	const { editor } = useEditor();
	const setSectors = useEditorStore(s => s.setSectors);

	const handle = debounce(() => {
		console.log('useEditorSectorsSync handle');
		const sectors = editor.run('style:sectors');
		console.log('useEditorSectorsSync handle', sectors);
		setSectors(sectors);
	}, 100);

	useEffect(() => {

		handle();
		editor.on('style:sectors:ready', handle);
		editor.on('style:sectors:updated', handle);
		editor.on('elements:selected', handle);

		return () => {
			editor.off('style:sectors:ready', handle);
			editor.off('style:sectors:updated', handle);
			editor.off('elements:selected', handle);
		}
	}, [editor]);
}

