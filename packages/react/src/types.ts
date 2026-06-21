import type { BlockDefinition, Editor } from '@pagepress/core'

export type EditorContextType = {
	promise: Promise<Editor>;
	setEditor: (value: Editor) => void;

	blocks?: BlockDefinition[]
}