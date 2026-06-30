import { Component } from "grapesjs";


export type LayerTreeNode = {
	id: string;
	name: string;
	open: boolean;
	selected: boolean;
	hovered: boolean;
	visible: boolean;
	locked: boolean;
	level: number;
	component: Component;
	children: LayerTreeNode[];
}