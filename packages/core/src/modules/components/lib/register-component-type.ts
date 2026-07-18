import { TraitProperties, type Editor as GjsEditor } from "grapesjs";
import { EditorComponentDefinition, EditorComponentPropDefinition } from "../types";
import { renderTemplate, stringifyAttrs } from "./template";

const penIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
  <path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"/>
</svg>`;

export function registerComponentType(gjseditor: GjsEditor, id: string, getter: (id: string) => EditorComponentDefinition | undefined) {
	const component = getter(id);
	if (!component) {
		throw new Error(`Component ${id} not found`);
	}
	console.log("registering component type", component);
	gjseditor.Components.addType(component.id, {
		isComponent: (el) => {
			return "hasAttribute" in el && el.hasAttribute(`data-pgpress-component-${component.id}`) ? {
				type: component.id,
			} : false
		},
		model: {
			defaults: {
				name: component.label,
				droppable: false,
				selectable: true,
				componentId: component.id,
				props: extractDefaultProps(component.properties),
				traits: extractTraits(component.properties),
			},


			init() {
				console.log("init", this);

				/**
				 * Toolbar setup
				 */
				const toolbar = this.get('toolbar') || [];
				this.set('toolbar', [
					...toolbar,
					{
						attributes: { title: 'Edit' },
						label: penIcon,
						command: 'pgpress:component:edit'
					}
				]);

				console.log("init", extractTraits(component.properties));
				for (const prop of extractTraits(component.properties)) {
					console.log("Listening to change:" + prop.id);
					this.on('change:' + prop.id, e => {
						console.log("[MODEL] change:" + prop.id, e);
					})
				}

				// If we were parsed from exported HTML, the parser turned the rendered
				// snapshot into child elements — discard them, the view owns the DOM.
				this.components().reset();

			},

			toHTML() {
				const def = getter(this.get('componentId'));
				if (!def) {
					throw new Error(`Component ${this.model.get('componentId')} not found`);
				}
				console.log("toHTML", this);
				const id = this.get('componentId');
				const props = this.get('props');
				const attrs = this.getAttrToHTML();     // user's classes/id from Selector Manager
				attrs['data-pp-component'] = id;
				attrs['data-pp-props'] = JSON.stringify(props);
				const tag = def.rootTagName;

				console.log("toHTML", `
					<${tag} ${stringifyAttrs(attrs)}>
						${renderTemplate(def.content, props)}
					</${tag}>
				`);
				return `
					<${tag} ${stringifyAttrs(attrs)}>
						${renderTemplate(def.content, props)}
					</${tag}>
				`;
			},
		},

		view: {
			init() {
				this.on('change:attributes:attribute-change', e => {
					console.log("[VIEW] attribute-change", e);
				})
				this.listenTo(this.model, 'change:props change:componentId', this.render);
			},
			onRender() {
				const def = getter(this.model.get('componentId'));
				if (!def) {
					throw new Error(`Component ${this.model.get('componentId')} not found`);
				}
				console.log("onRender", `
						${renderTemplate(def.content, this.model.get('props'))}
					`);
				console.log("onRender", this.model.get('props'));
				this.el.innerHTML = renderTemplate(
					def.content,
					this.model.get('props'),
				);
			},
		},

	});
}


function extractDefaultProps(props: Record<string, EditorComponentPropDefinition>) {

	let result: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(props)) {
		if (value?.default) {
			result[key] = value.default.toString();
		}
	}

	console.log("extractDefaultProps", result);
	return result;
}



function extractTraits(props: Record<string, EditorComponentPropDefinition>) {
	return Object.entries(props).map(([key, value]) => propDefinitionToTrait(key, value));
}


function propDefinitionToTrait(id: string, propDefinition: EditorComponentPropDefinition): Partial<TraitProperties> {

	return {
		id: id,
		name: id,
		label: propDefinition.label,
		type: propDefinition.type,
		placeholder: propDefinition.label ?? '',
		getValue: ({ component }) => {
			return component.get('props')?.[id];
		},
		setValue: ({ component, value }) => {
			component.set('props', { ...component.get('props'), [id]: value });
			component.trigger('change:props');
		},
	}
}