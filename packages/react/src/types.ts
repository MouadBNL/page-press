import type { BlockDefinition, Editor } from '@pagepress/core'
import { ReactNode } from 'react';
import { EditorStore } from './store';

export type EditorContextType = {
	promise: Promise<Editor>;
	setEditor: (value: Editor) => void;

	blocks?: BlockDefinition[]

	store: EditorStore
}



export interface PanelDefintion {
	id: string;
	icon: ReactNode;
	label: string;
}
