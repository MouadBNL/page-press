import { Sector } from "@pagepress/core";
import { useEditorStore } from "../../../hooks/use-editor-store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@pagepress/ui/components/accordion";
import { ColorProperty, CompositeProperty, NumberProperty, SectorProperty, SelectProperty, SliderProperty, StackProperty } from "@pagepress/core/src/modules/sectors";
import { ScrollArea } from "@pagepress/ui/components/scroll-area";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pagepress/ui/components/select";
import { NumberInput } from "@pagepress/ui/components/number-input";
import { Slider } from "@pagepress/ui/components/slider";
import { ColorInput } from "@pagepress/ui/components/color-input";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@pagepress/ui/components/button";
import { useEditorCmd } from "../../../hooks/use-editor-cmd";
import { Input } from "@pagepress/ui/components/input";




export function EditorElementStylesPanel() {
	const sectors = useEditorStore(s => s.sectors);

	return (
		<article className="flex-1 h-full overflow-hidden">
			<ScrollArea className="flex-1 h-full overflow-auto">
				<SectorsList>
					{sectors.map(sector => (
						<SectorItem key={sector.id} sector={sector} />
					))}
				</SectorsList>
			</ScrollArea>
		</article>
	)
}




function SectorsList({ children }: { children: React.ReactNode }) {
	return (
		<Accordion type="multiple" className="rounded-none border-none">
			{children}
		</Accordion>
	)
}

function SectorItem({ sector }: { sector: Sector }) {
	return (
		<AccordionItem value={sector.id} className="data-open:bg-muted/0">
			<AccordionTrigger className="text-sm font-bold">{sector.name}</AccordionTrigger>
			<AccordionContent>
				<div className="flex flex-col gap-2">
					{sector.properties.map(property => (
						<PropertyItem key={property.id+sector.id} property={property} />
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}



function PropertyItem({ property }: { property: SectorProperty }) {
"use no memo"

const { run } = useEditorCmd('style:property:set');


const onChange = (value: any) => {
	console.log('onChange', {value, property: property.getId()});
	run({ property: property.getId(), value }).catch(err => {
		console.error('onChange error', err);
	});
}
	switch (property.getType()) {
		case 'select':
		case 'radio':
			return <SelectPropertyItem property={property as SelectProperty} onChange={onChange} />;
		case 'number':
			return <NumberPropertyItem property={property as NumberProperty} onChange={onChange} />;
		case 'slider':
			return <SliderPropertyItem property={property as SliderProperty} onChange={onChange} />;
		case 'color':
			return <ColorPropertyItem property={property as ColorProperty} onChange={onChange} />;

		case 'composite':
			return <CompositePropertyItem property={property as CompositeProperty} onChange={onChange} />;
		case 'stack':
			return <StackPropertyItem property={property as StackProperty} onChange={onChange} />;
		default:
			return <DebugPropertyItem property={property} />;
	}
}

function SelectPropertyItem({ property, onChange }: { property: SelectProperty, onChange: (value: any) => void }) {
	"use no memo";
	const options = property.getOptions();

	return (
		<div>
			<label>{property.getLabel()}</label>
			<Select value={property.getValue()} onValueChange={onChange}>
				<SelectTrigger className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{options.map(option => (
						<SelectItem key={option.id} value={option.id}>{option.id}</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}


function NumberPropertyItem({ property, onChange }: { property: NumberProperty, onChange: (value: any) => void }) {
	"use no memo";
	return (
		<div>
			<label>{property.getLabel()}</label>
			<Input value={property.getValue()} onChange={(e) => onChange(e.target.value)} />
		</div>
	)
}


function SliderPropertyItem({ property, onChange }: { property: SliderProperty, onChange: (value: any) => void }) {
	"use no memo";

	return (
		<div>
			<label>{property.getLabel()}</label>
			<div className="h-7 flex items-center">
				<Slider
					value={[property.getValue()]}
					max={property.getMax()}
					min={property.getMin()}
					step={property.getStep()}
					className="mx-auto w-full max-w-xs"
					onValueChange={(value) => onChange(value[0])}
				/>
				<span className="text-xs text-muted-foreground block w-10 text-right">{Number(property.getValue()).toFixed(2)}%</span>
			</div>
		</div>
	)
}

function ColorPropertyItem({ property, onChange }: { property: ColorProperty, onChange: (value: any) => void }) {
	"use no memo";
	return (
		<div>
			<label>{property.getLabel()}</label>
			<ColorInput value={property.getValue()} onChange={onChange} />
		</div>
	)
}


function CompositePropertyItem({ property, onChange }: { property: CompositeProperty, onChange: (value: any) => void }) {
	"use no memo";
	return (
		<div>
			<label>{property.getLabel()}</label>
			<div className="flex flex-col gap-2 bg-muted px-2 py-3 rounded-md">
				{property.getProperties().map(property => (
					<PropertyItem key={property.id} property={property} />
				))}
			</div>
		</div>
	)
}

function StackPropertyItem({ property, onChange }: { property: StackProperty, onChange: (value: any) => void }) {
	"use no memo";
	return (
		<div>
			<div className="flex items-center gap-2 justify-between">
				<label>{property.getLabel()}</label>
				<Button variant="ghost" className="h-5">
					<IconPlus className="size-3" />
				</Button>
			</div>
			<div className="flex flex-col gap-2 bg-muted p-1 rounded-md">
				{property.getLayers().map(layer => (
					<div className="">
						{property.getProperties().map(property => (
							<PropertyItem key={property.id} property={property} />
						))}
					</div>
				))}
			</div>
		</div>
	)
}

function DebugPropertyItem({ property }: { property: SectorProperty }) {
	"use no memo";
	return (
		<div className="bg-muted p-2 rounded-md">
			<span className="text-xs text-muted-foreground">{property.getType()}</span>
		</div>
	)
}