import type { EditorStyleSector, ColorStyleProperty, CompositeStyleProperty, NumberStyleProperty, SelectStyleProperty, SliderStyleProperty, StackStyleProperty, EditorStyleProperty, StylePropertyQuery } from "@pagepress/core";
import { useEditorStore } from "../../../hooks/use-editor-store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@pagepress/ui/components/accordion";
import { ScrollArea } from "@pagepress/ui/components/scroll-area";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pagepress/ui/components/select";
import { Slider } from "@pagepress/ui/components/slider";
import { ColorInput } from "@pagepress/ui/components/color-input";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Button } from "@pagepress/ui/components/button";
import { useEditorCmd } from "../../../hooks/use-editor-cmd";
import { Input } from "@pagepress/ui/components/input";
import { useEditor } from "../../../hooks/use-editor";
import { debounce } from "../../../lib/debounce";
import { useLocalEcho } from "../../../hooks/use-local-echo";




export function EditorStylesPanel() {
	const sectors = useEditorStore(s => s.sectors);

	console.log('sectors', sectors);

	return (
		<article className="flex-1 h-full overflow-hidden">
			<ScrollArea className="flex-1 h-full overflow-auto">
				<SectorsList>
					{sectors.map(sector => (
						<React.Fragment key={sector.id}>
							{sector.visible && (
								<SectorItem key={sector.id} sector={sector} />
							)}
						</React.Fragment>
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

function SectorItem({ sector }: { sector: EditorStyleSector }) {
	return (
		<AccordionItem value={sector.id} className="data-open:bg-muted/0">
			<AccordionTrigger className="text-sm font-bold">{sector.name}</AccordionTrigger>
			<AccordionContent>
				<div className="flex flex-col gap-2">
					{sector.properties.map(property => (
						<PropertyItem
							key={property.id + sector.id}
							property={property}
							sectorId={sector.id}
							propertyId={property.getId()}
						/>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}


type PropertyItemProps = {
	property: EditorStyleProperty;
} & StylePropertyQuery;
function PropertyItem({ property, ...query }: PropertyItemProps) {
	"use no memo"

	const { run } = useEditorCmd('style:property:set');

	const onChange = (value: any) => {
		const success = run({ query, value });
		if (!success) {
			console.error('onChange error', { query, value });
		}
	};

	if (!property.isVisible()) {
		return null;
	}

	switch (property.getType()) {
		case 'select':
		case 'radio':
			return <SelectPropertyItem property={property as SelectStyleProperty} onChange={onChange} />;
		case 'number':
			return <NumberPropertyItem property={property as NumberStyleProperty} onChange={onChange} />;
		case 'slider':
			return <SliderPropertyItem property={property as SliderStyleProperty} onChange={onChange} />;
		case 'color':
			return <ColorPropertyItem property={property as ColorStyleProperty} onChange={onChange} />;

		case 'composite':
			return <CompositePropertyItem
				property={property as CompositeStyleProperty}
				sectorId={query.sectorId}
				propertyId={query.propertyId}
			/>;
		case 'stack':
			return <StackPropertyItem
				property={property as StackStyleProperty}
				sectorId={query.sectorId}
				propertyId={query.propertyId}
			/>;
		default:
			return <DebugPropertyItem property={property} />;
	}
}

function SelectPropertyItem({ property, onChange }: { property: SelectStyleProperty, onChange: (value: any) => void }) {
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



function NumberPropertyItem({ property, onChange }: { property: NumberStyleProperty, onChange: (value: any) => void }) {
	"use no memo";
	const echo = useLocalEcho(property.getValue(), onChange);
	return (
		<div>
			<label>{property.getLabel()}</label>
			<Input
				value={echo.value}
				onChange={(e) => echo.onChange(e.target.value)}
				onFocus={echo.onFocus}
				onBlur={echo.onBlur}
			/>
		</div>
	)
}


function SliderPropertyItem({ property, onChange }: { property: SliderStyleProperty, onChange: (value: any) => void }) {
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

function ColorPropertyItem({ property, onChange }: { property: ColorStyleProperty, onChange: (value: any) => void }) {
	"use no memo";
	const echo = useLocalEcho(property.getValue(), onChange);
	return (
		<div>
			<label>{property.getLabel()}</label>
			<ColorInput
				value={echo.value}
				onChange={echo.onChange}
				onFocus={echo.onFocus}
				onBlur={echo.onBlur}
			/>
		</div>
	)
}


type CompositePropertyItemProps = {
	property: CompositeStyleProperty;
	sectorId: string;
	propertyId: string;
	subPropertyId?: string;
}
function CompositePropertyItem({ property, sectorId, propertyId }: CompositePropertyItemProps) {
	"use no memo";
	return (
		<div>
			<label>{property.getLabel()}</label>
			<div className="flex flex-col gap-2 bg-muted px-2 py-3 rounded-md">
				{property.getProperties().map(property => (
					<PropertyItem
						parentType="composite"
						key={property.id}
						property={property}
						sectorId={sectorId}
						propertyId={propertyId}
						subPropertyId={property.getId()}
					/>
				))}
			</div>
		</div>
	)
}


type StackPropertyItemProps = {
	property: StackStyleProperty;
	sectorId: string;
	propertyId: string;
	subPropertyId?: string;
}
function StackPropertyItem({ property, sectorId, propertyId }: StackPropertyItemProps) {
	"use no memo";

	const [selectedLayerIdx, setSelectedLayerIdx] = useState<number | null>(null);
	const { run: addLayer } = useEditorCmd('style:stack:add-layer');
	const { run: removeLayer } = useEditorCmd('style:stack:remove-layer');
	const { run: getSelectedLayer } = useEditorCmd('style:stack:get-selected-layer');
	const { run: setSelectedLayer } = useEditorCmd('style:stack:set-selected-layer');

	const { editor } = useEditor();
	useEffect(() => {
		const handle = debounce(() => {
			console.log('handle');
			const layerIdx = getSelectedLayer({
				query: { sectorId, propertyId }
			});
			console.log('handle', layerIdx);
			setSelectedLayerIdx(layerIdx);
		}, 100);
		editor.on('style:sectors:updated', handle);
		return () => {
			editor.off('style:sectors:updated', handle);
		}
	}, [sectorId, propertyId]);

	const handleAddLayer = () => {
		addLayer({
			query: { sectorId, propertyId }
		})
	};

	const handleChangeLayer = (value: string) => {
		console.log('handleChangeLayer', value);
		const success = setSelectedLayer({ query: { sectorId, propertyId }, layerIdx: Number(value) })
		
		if (!success) {
			console.error('handleChangeLayer error', { sectorId, propertyId, layerIdx: Number(value) });
		}
	};

	const handleRemoveLayer = (layerIdx: number) => {
		removeLayer({
			query: { sectorId, propertyId },
			layerIdx
		})
	};
	return (
		<div>
			<div className="flex items-center gap-2 justify-between">
				<label>{property.getLabel()} / selected: {selectedLayerIdx}</label>
				<Button variant="ghost" className="h-5" onClick={handleAddLayer}>
					<IconPlus className="size-3" />
				</Button>
			</div>
			<div className="flex flex-col gap-2 bg-muted p-1 rounded-md">
				<Accordion type="single" value={selectedLayerIdx?.toString() || ''} onValueChange={handleChangeLayer} className="rounded-none border-none">
					{property.getLayers().reverse().map(layer => (
						<AccordionItem key={layer.getId()} value={layer.getIndex().toString()}>
							<AccordionTrigger className="p-1 gap-2 flex items-center justify-between">
								<div className="flex flex-1 w-full items-center justify-between">
									<span>
										{layer.getLabel()} / idx: {layer.getId()}
									</span>

									<IconX className="size-3 cursor-pointer shrink-0 text-muted-foreground"
										onClick={(e) => {
											e.stopPropagation();
											handleRemoveLayer(layer.getIndex());
										}} />
								</div>

							</AccordionTrigger>
							<AccordionContent>
								{property.getProperties().map(property => (
									<PropertyItem
										key={property.id}
										parentType="stack"
										property={property}
										sectorId={sectorId}
										layerIdx={layer.getIndex()}
										propertyId={propertyId}
										subPropertyId={property.getId()}
									/>
								))}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	)
}

function DebugPropertyItem({ property }: { property: EditorStyleProperty }) {
	"use no memo";
	return (
		<div className="bg-muted p-2 rounded-md">
			<span className="text-xs text-muted-foreground">{property.getType()}</span>
		</div>
	)
}