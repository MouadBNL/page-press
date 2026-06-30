import { CompositeProperty, PropertyInCompositeQuery, PropertyInStackQuery, PropertyPrimitiveQuery, PropertyQuery, StackProperty } from "./type";
import { Editor } from "grapesjs";



export function findProperty(editor: Editor, query: PropertyQuery) {
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


export function findPrimitiveProperty(editor: Editor, query: PropertyPrimitiveQuery) {
	const sector = editor.StyleManager.getSector(query.sectorId);
	if (!sector) {
		return null;
	}

	const property = sector.getProperty(query.propertyId);
	return property;
}

export function findPropertyInComposite(editor: Editor, query: PropertyInCompositeQuery) {
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
	const subProperty = (property as CompositeProperty).getProperties().find(p => p.getId() === query.subPropertyId);
	console.log('[findPropertyInComposite] SubProperty', subProperty);
	if (!subProperty) {
		return null;
	}
	return subProperty;
}

export function findPropertyInStack(editor: Editor, query: PropertyInStackQuery) {
	const sector = editor.StyleManager.getSector(query.sectorId);
	if (!sector) {
		return null;
	}

	const property: StackProperty = sector.getProperty(query.propertyId) as StackProperty;
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

