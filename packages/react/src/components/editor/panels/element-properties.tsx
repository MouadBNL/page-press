import { ScrollArea } from "@pagepress/ui/components/scroll-area";
import { useEditorStore } from "../../../hooks/use-editor-store";
import { ComponentProperty } from "@pagepress/core";
import { useLocalEcho } from "../../../hooks/use-local-echo";
import { Input } from "@pagepress/ui/components/input";



export function EditorElementPropertiesPanel() {
	const properties = useEditorStore((s) => s.properties);

	return (
		<article className="flex flex-col h-full overflow-hidden">
			<ScrollArea className="flex-1 overflow-auto">
				<div className="grid grid-cols-1">
					{properties.map((property) => (
						<div key={property.id} className="p-2 border-b">
							<PropertyItem property={property} onChange={() => {}} />
						</div>
					))}
				</div>
				<pre>{JSON.stringify(properties, null, 2)}</pre>
			</ScrollArea>
		</article>
	)
}




function PropertyItem({ property, onChange }: { property: ComponentProperty, onChange: (value: any) => void }) {
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