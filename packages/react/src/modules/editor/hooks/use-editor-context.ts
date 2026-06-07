import { use } from "react";
import { EditorContext } from "../context";



export function useEditorContext() {
	const ctx = use(EditorContext);
	if(!ctx) {
		throw new Error("useEditorContext must be used inside <Editor.Root />");
	}

	return ctx
}