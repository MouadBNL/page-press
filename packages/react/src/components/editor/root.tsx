import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlockDefinition, Editor } from "@pagepress/core";
import { createDeferred, Deferred } from "../../lib/deferred";
import { EditorContext } from "../../context";
import { createEditorStore, EditorStore } from "../../store";
import { EditorContextType } from "../../types";
import { EditorGate } from "./gate";
import { useEditorSelectedSync } from "../../hooks/use-editor-selected-sync";
import { useEditorSelectorsSync } from "../../hooks/use-editor-selectors-sync";
import { useEditorSectorsSync } from "../../hooks/use-editor-sectors-sync";

type Props = React.ComponentProps<"section"> & {
	blocks?: BlockDefinition[]
};
export function EditorRoot(props: Props) {

	const editorRef = useRef<Editor | null>(null);
	const deferredRef = useRef<Deferred<Editor> | undefined>(undefined);
	const resolvedRef = useRef<boolean>(false);
	const mountedRef = useRef<boolean>(false); // needed for Strict mode remounting

	// Zustand store
	const storeRef = useRef<EditorStore>(undefined);
	if (!storeRef.current) {
		storeRef.current = createEditorStore();
	}

	if (!deferredRef.current) {
		deferredRef.current = createDeferred<Editor>();
	}

	const setEditor = useCallback((editor: Editor) => {
		editorRef.current = editor ?? undefined;
		resolvedRef.current = true;
		deferredRef.current!.resolve(editor);
	}, []);

	const value = useMemo<EditorContextType>(() => ({
		promise: deferredRef.current!.promise,
		setEditor,
		blocks: props.blocks,
		store: storeRef.current!,
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
			<EditorGate>
				<EditorSync />
			</EditorGate>
			<section {...props} />
		</EditorContext.Provider>
	)
}


function EditorSync() {
	useEditorSelectedSync();
	useEditorSelectorsSync();
	useEditorSectorsSync();

	return  null;
}