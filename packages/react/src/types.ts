import type { BlockDefinition, Editor } from '@pagepress/core'
import { ReactNode } from 'react';
import { EditorStore } from './store';
import { EditorComponentDefinition } from '@pagepress/core/src/modules/components';

export type EditorContextType = {
	promise: Promise<Editor>;
	setEditor: (value: Editor) => void;

	blocks?: BlockDefinition[]
	components?: EditorComponentDefinition[]
	store: EditorStore
}


export type SidebarPanels = 'element-styles' | 'element-settings';