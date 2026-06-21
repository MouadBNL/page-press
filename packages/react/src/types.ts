import type { BlockDefinition, Editor } from '@pagepress/core'
import { ReactNode } from 'react';
import { EditorStore } from './store';

export type EditorContextType = {
	promise: Promise<Editor>;
	setEditor: (value: Editor) => void;

	blocks?: BlockDefinition[]

	store: EditorStore
}


export type SidebarPanels = 'element-styles' | 'element-settings';