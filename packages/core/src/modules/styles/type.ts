import { Property, PropertyComposite, PropertyNumber, PropertyPropsCustom, PropertySelect, PropertySelectProps, PropertySlider, PropertyStack, PropertyTypes } from "grapesjs";



export type EditorStyleSector = {
	id: string;
	name: string;
	visible: boolean;
	properties: EditorStyleProperty[];
};


export type EditorStyleProperty<T extends PropertyPropsCustom = PropertyPropsCustom> =  Property<T>;

export type SelectStyleProperty = PropertySelect;
export type NumberStyleProperty = PropertyNumber;
export type SliderStyleProperty = PropertySlider;
export type ColorStyleProperty = Property;
export type CompositeStyleProperty = PropertyComposite;
export type StackStyleProperty = PropertyStack;




export type StylePropertyPrimitiveQuery = {
	sectorId: string;
	propertyId: string;
}

export type StylePropertyInCompositeQuery = {
	parentType: 'composite';
	sectorId: string;
	propertyId: string;
	subPropertyId: string;
}

export type StylePropertyInStackQuery = {
	parentType: 'stack';
	sectorId: string;
	propertyId: string;
	layerIdx: number;
	subPropertyId: string;
}

export type StylePropertyQuery = StylePropertyPrimitiveQuery | StylePropertyInCompositeQuery | StylePropertyInStackQuery;
	