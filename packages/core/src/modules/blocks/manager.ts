import { BlockDefinition } from "./types";



export class BlockManager {
	private _blocks: BlockDefinition[] = [];

	constructor (blocks?: BlockDefinition[]) {
		this.set(blocks ?? []);
	}

	public set(blocks: BlockDefinition[]) {
		this._blocks = structuredClone(blocks);
	}

	public list() {
		return structuredClone(this._blocks);
	}

	public get(id: string) {
		return structuredClone(this._blocks.find(e => e.id == id));
	}
}