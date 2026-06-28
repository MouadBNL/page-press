import { EditorCommandMap } from "@pagepress/core/src/kernel/commands";
import { useEditor } from "./use-editor";
import { PayloadOf } from "@pagepress/core/src/lib/command-bus";



export function useEditorCmd<K extends keyof EditorCommandMap>(cmd: K) {
	const { editor } = useEditor();

	const run = (args: PayloadOf<EditorCommandMap[K]>) => {
		const payload: any = args;
		// @ts-ignore
		return editor.run(cmd, payload);
	}

	return { run };
}