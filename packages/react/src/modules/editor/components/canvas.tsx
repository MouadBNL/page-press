import { useEffect, useRef } from "react"
import { useEditorContext } from "../hooks/use-editor-context";
import { Editor } from '@pagepress/core'

export function EditorCanvas() {
	const ctx = useEditorContext();

	const containerRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<Editor|null>(null);
	const mounted = useRef<boolean>(false);
	

	useEffect(() => {
		if(!containerRef.current) return;
		if (editorRef.current) return;
		mounted.current = true;

		const editor = new Editor({
			container: containerRef.current
		});

		ctx.setEditor(editor);
		editorRef.current = editor;

	},[]);

	return (
		<div ref={containerRef}></div>
	)
}