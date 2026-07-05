import { CompositeStyleProperty, StylePropertyInCompositeQuery, StylePropertyInStackQuery, StylePropertyPrimitiveQuery, StylePropertyQuery, StackStyleProperty } from "./type";
import { Editor } from "grapesjs";



export function findProperty(editor: Editor, query: StylePropertyQuery) {
	if (!("parentType" in query)) {
		return findPrimitiveProperty(editor, query);
	}

	switch (query.parentType) {
		case 'composite':
			return findPropertyInComposite(editor, query);
		case 'stack':
			return findPropertyInStack(editor, query);
	}
	return null;
}


export function findPrimitiveProperty(editor: Editor, query: StylePropertyPrimitiveQuery) {
	const sector = editor.StyleManager.getSector(query.sectorId);
	if (!sector) {
		return null;
	}

	const property = sector.getProperty(query.propertyId);
	return property;
}

export function findPropertyInComposite(editor: Editor, query: StylePropertyInCompositeQuery) {
	const sector = editor.StyleManager.getSector(query.sectorId);
	console.log('[findPropertyInComposite] Sector', sector);
	if (!sector) {
		return null;
	}


	const property = sector.getProperty(query.propertyId);
	console.log('[findPropertyInComposite] Property', property);
	if (!property || property.getType() !== 'composite') {
		return null;
	}
	const subProperty = (property as CompositeStyleProperty).getProperties().find(p => p.getId() === query.subPropertyId);
	console.log('[findPropertyInComposite] SubProperty', subProperty);
	if (!subProperty) {
		return null;
	}
	return subProperty;
}

export function findPropertyInStack(editor: Editor, query: StylePropertyInStackQuery) {
	const sector = editor.StyleManager.getSector(query.sectorId);
	if (!sector) {
		return null;
	}

	const property: StackStyleProperty = sector.getProperty(query.propertyId) as StackStyleProperty;
	if (!property || property.getType() !== 'stack') {
		return null;
	}

	const layer = property.getLayer(query.layerIdx);
	if (!layer) {
		return null;
	}
	property.selectLayer(layer);

	return property.getProperty(query.subPropertyId);
}

