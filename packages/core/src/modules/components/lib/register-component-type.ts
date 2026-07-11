import { TraitProperties, type Editor as GjsEditor } from "grapesjs";
import { EditorComponentDefinition, EditorComponentPropDefinition } from "../types";
import { renderTemplate, stringifyAttrs } from "./template";


export function registerComponentType(gjseditor: GjsEditor, component: EditorComponentDefinition) {
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
				props: extractDefaultProps(component.props),
				traits: extractTraits(component.props),
			},

			init() {
				console.log("init", this);

				console.log("init", extractTraits(component.props));
				for (const prop of extractTraits(component.props)) {
					console.log("Listening to change:" + prop.id);
					this.on('change:' + prop.id,  e =>{
						console.log("[MODEL] change:" + prop.id, e);
					})
				}

				// If we were parsed from exported HTML, the parser turned the rendered
				// snapshot into child elements — discard them, the view owns the DOM.
				this.components().reset();

			},

			toHTML() {
				console.log("toHTML", this);
				const id = this.get('componentId');
				const props = this.get('props');
				const attrs = this.getAttrToHTML();     // user's classes/id from Selector Manager
				attrs['data-pp-component'] = id;
				attrs['data-pp-props'] = JSON.stringify(props);
				const tag = component.rootTagName;

				console.log("toHTML", `
					<${tag} ${stringifyAttrs(attrs)}>
						${renderTemplate(component.content, props)}
					</${tag}>
				`);
				return `
					<${tag} ${stringifyAttrs(attrs)}>
						${renderTemplate(component.content, props)}
					</${tag}>
				`;
			},
		},

		view: {
			init() {
				this.on('change:attributes:attribute-change',  e =>{
					console.log("[VIEW] attribute-change", e);
				})
				this.listenTo(this.model, 'change:props change:componentId', this.render);
			},
			onRender() {
				console.log ("onRender", `
						${renderTemplate(component.content, this.model.get('props'))}
					`);
					console.log("onRender", this.model.get('props'));
				this.el.innerHTML = renderTemplate(
					component.content,
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
		getValue: ({component}) => { 
			return component.get('props')?.[id];
		},
		setValue: ({component, value}) => {
			component.set('props', { ...component.get('props'), [id]: value });
			component.trigger('change:props');
		},
	}
}