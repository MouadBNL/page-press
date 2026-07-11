import React, { useEffect, useRef } from "react"
import { Editor } from '@pagepress/core'
import { useEditorContext } from "../../hooks/use-editor-context";
import { ResizablePanel } from "@pagepress/ui/components/resizable";

type Props = React.ComponentProps<"div"> & {
	containerProps?: React.ComponentProps<"div">
}
export function EditorCanvas({ containerProps, ...props }: Props) {
	const ctx = useEditorContext();

	const containerRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<Editor | null>(null);
	const mounted = useRef<boolean>(false);


	useEffect(() => {
		if (!containerRef.current) return;
		if (editorRef.current) return;
		mounted.current = true;

		const editor = new Editor({
			container: containerRef.current,
			blocks: ctx.blocks,
			components: ctx.components,
		});

		ctx.setEditor(editor);
		editorRef.current = editor;

	}, []);

	return (
		<ResizablePanel {...props}>
			<div ref={containerRef} {...containerProps}></div>
		</ResizablePanel>
	)
}