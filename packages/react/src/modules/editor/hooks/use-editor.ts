import { use } from "react";
import { useEditorContext } from "./use-editor-context";


export function useEditor() {
	const ctx = useEditorContext();

	const editor = use(ctx.promise);

	if(!editor) {
		throw new Error('useEditor must only be used inside Editor.Root once the Editor.Canvas has been mounted');
	}

	return { editor }
}