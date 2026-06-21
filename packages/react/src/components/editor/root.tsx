import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlockDefinition, Editor } from "@pagepress/core";
import { createDeferred, Deferred } from "../../lib/deferred";
import { EditorContext } from "../../context";

type Props = React.ComponentProps<"section"> & {
	blocks?: BlockDefinition[]
};
export function EditorRoot(props: Props) {
	console.log('[EditorRoot] Mounted');

	const editorRef = useRef<Editor | null>(null);
	const deferredRef = useRef<Deferred<Editor> | undefined>(undefined);
	const resolvedRef = useRef<boolean>(false);
	const mountedRef = useRef<boolean>(false); // needed for Strict mode remounting

	if (!deferredRef.current) {
		deferredRef.current = createDeferred<Editor>();
	}

	const setEditor = useCallback((editor: Editor) => {
		editorRef.current = editor ?? undefined;
		resolvedRef.current = true;
		deferredRef.current!.resolve(editor);
	}, []);

	const value = useMemo(() => ({
		promise: deferredRef.current!.promise,
		setEditor,
		blocks: props.blocks,
	}), [setEditor, props.blocks]);

	useEffect(() => {
		if (!resolvedRef.current) return;
		if (!mountedRef.current) {
			mountedRef.current = true;
			return;
		}
		return () => {
			if (!editorRef.current) return;
			console.log("Cleaning up", {
				editor: editorRef.current
			})
			editorRef.current.dispose();
			editorRef.current = null;
		}
	}, []);


	return (
		<EditorContext.Provider value={value}>
			<section {...props} />
		</EditorContext.Provider>
	)
}