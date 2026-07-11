import { ScrollArea } from "@pagepress/ui/components/scroll-area";
import { useEditorStore } from "../../../hooks/use-editor-store";
import { EditorProperty } from "@pagepress/core";
import { useLocalEcho } from "../../../hooks/use-local-echo";
import { Input } from "@pagepress/ui/components/input";
import { useEffect } from "react";



export function EditorPropertiesPanel() {
	const properties = useEditorStore((s) => s.properties);

	return (
		<article className="flex flex-col h-full overflow-hidden">
			<ScrollArea className="flex-1 overflow-auto">
				<div className="grid grid-cols-1">
					{properties.map((property) => (
						<div key={property.id} className="p-2 border-b">
							<PropertyItem property={property} onChange={(e) => {
								property.setValue(e);
							}} />
						</div>
					))}
				</div>
			</ScrollArea>
		</article>
	)
}


function PropertyItem({ property, onChange }: { property: EditorProperty, onChange: (value: string) => void }) {
	"use no memo";
	const echo = useLocalEcho(property.getValue(), onChange);

	useEffect(() => {

		const handler = (e: any) => {
			console.log("[PropertyItem] change", property.getId(), e.getValue());
			echo.onChange(e.getValue());
		}

		property.on('change', handler);

		return () => {
			property.off('change', handler);
		}
	}, [property]);


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