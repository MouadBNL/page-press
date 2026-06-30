import { Component, Editor } from "grapesjs";
import { EditorContext } from "../../../kernel/types";
import { CommandHandler } from "../../../lib/command-bus";
import { LayerTreeNode } from "../types";


export class LayerGetTreeCommand extends CommandHandler<void, LayerTreeNode | null> {
	private readonly _context: EditorContext;

	constructor(context: EditorContext) {
		super();
		this._context = context;
	}

	async handle(): Promise<LayerTreeNode> {
		const editor = this._context.gjseditor;
		const root = editor.LayerManager.getRoot();

		return buildLayerTree(editor, root);
	}
}

function buildLayerTree(editor: Editor, root: Component, level: number = 0): LayerTreeNode {
	const data = editor.Layers.getLayerData(root);
	const layers = editor.Layers.getComponents(root);

	return {
		id: root.getId(),
		name: root.getName(),
		open: data.open,
		selected: data.selected,
		hovered: data.hovered,
		visible: data.visible,
		locked: data.locked,
		level,
		component: root,
		children: layers.map(layer => buildLayerTree(editor, layer, level + 1)),
	} satisfies LayerTreeNode;
}