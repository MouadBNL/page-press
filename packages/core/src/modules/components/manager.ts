import { registerComponentType } from "./lib/register-component-type";
import { EditorComponentDefinition } from "./types";
import { type Editor as GjsEditor } from "grapesjs";


export class ComponentManager {

	private _gjseditor: GjsEditor;
	private _components: Record<string, EditorComponentDefinition> = {};

	constructor(gjseditor: GjsEditor, components?: EditorComponentDefinition[]) {
		this._gjseditor = gjseditor;
		this.set(components ?? []);
	}

	public set(components: EditorComponentDefinition[]) {
		components.forEach(component => this.register(component));
	}

	public get(id: string): EditorComponentDefinition | undefined {
		return structuredClone(this._components[id]);
	}

	public list(): EditorComponentDefinition[] {
		return structuredClone(Object.values(this._components));
	}

	public register(component: EditorComponentDefinition) {
		registerComponentType(this._gjseditor, component);
		this._components[component.id] = component;
	}
}