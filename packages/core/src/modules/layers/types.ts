import { EditorElement } from "../elements";


export type LayerTreeNode = {
	id: string;
	name: string;
	open: boolean;
	selected: boolean;
	hovered: boolean;
	visible: boolean;
	locked: boolean;
	level: number;
	element: EditorElement;
	children: LayerTreeNode[];
}