import { PropertyQuery } from "./type";
import { Editor, PropertyComposite } from "grapesjs";

export function findProperty(editor: Editor, query: PropertyQuery) {
	const sector = editor.StyleManager.getSector(query.sector);
	if (!sector) {
		return null;
	}


	const property = sector.getProperty(query.propertyId);
	if (!property) {
		return null;
	}

	if (query.subPropertyId) {
		const subProperty = (property as PropertyComposite).getProperty(query.subPropertyId);
		if (!subProperty) {
			return null;
		}
		return subProperty;
	}

	return property;
}