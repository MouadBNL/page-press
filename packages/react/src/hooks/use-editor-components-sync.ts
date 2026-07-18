import { useEffect } from "react";
import { useEditorStore } from "./use-editor-store";
import { useEditor } from "./use-editor";



export function useEditorComponentsSync() {
	const { editor } = useEditor();
	const setComponents = useEditorStore((s) => s.setComponents);

	useEffect(() => {
		const handle = () => {
			const components = editor.run('components:list');
			setComponents(components);
		}
		handle();
		editor.on('components:list:updated', handle);
		return () => {
			editor.off('components:list:updated', handle);
		}
	}, []);
}