import { use } from "react";
import { useStore } from "zustand";
import { EditorContext } from "../context";
import { EditorStore, EditorStoreSlices } from "../store";

export function useEditorStore<T>(selector: (state: EditorStoreSlices) => T): T {
	const ctx = use(EditorContext);
	if (!ctx) throw new Error("useEditorStore must be used within an Editor.Root");
	return useStore(ctx.store, selector);
}

export function useEditorStoreApi(): EditorStore {
	const ctx = use(EditorContext);
	if (!ctx) throw new Error("useEditorStore must be used within an Editor.Root");
	return ctx.store;
}
