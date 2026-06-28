import { Property, PropertyComposite, PropertyNumber, PropertyPropsCustom, PropertySelect, PropertySelectProps, PropertySlider, PropertyStack, PropertyTypes } from "grapesjs";



export type Sector = {
	id: string;
	name: string;
	properties: SectorProperty[];
};


export type SectorProperty<T extends PropertyPropsCustom = PropertyPropsCustom> =  Property<T>;

export type SelectProperty = PropertySelect;
export type NumberProperty = PropertyNumber;
export type SliderProperty = PropertySlider;
export type ColorProperty = Property;
export type CompositeProperty = PropertyComposite;
export type StackProperty = PropertyStack;