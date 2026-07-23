import { EditorContext } from "../../kernel/types";
import { refreshComponentTypeContent } from "./lib/refresh-component-type-content";
import { registerComponentType, updateComponentType } from "./lib/register-component-type";
import { EditorComponentDefinition } from "./types";


export class ComponentManager {

	private context: EditorContext;
	private _components: Record<string, EditorComponentDefinition> = {};

	constructor(context: EditorContext, components?: EditorComponentDefinition[]) {
		this.context = context;
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

	public add(component: EditorComponentDefinition) {
		if(this._components[component.id]) {
			console.warn(`Component with id ${component.id} already exists.`);
			return;
		}
		this._components[component.id] = component;
		this.register(component);
		this.context.emit('components:list:updated');
	}

	public update(id: string, component: EditorComponentDefinition) {
		this._components[id] = component;
		this.register(component);
		updateComponentType(this.context.gjseditor, component);
		// refreshComponentTypeContent(this.context.gjseditor, id);
		this.context.emit('component:update', { component });
	}

	public register(component: EditorComponentDefinition) {
		this._components[component.id] = component;
		registerComponentType(this.context.gjseditor, component.id, (id) => this._components[id]);
	}
}