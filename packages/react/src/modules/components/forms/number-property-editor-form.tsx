import { EditorComponentNumericPropDefinition } from "@pagepress/core/src/modules/components/types";
import { Label } from "@pagepress/ui/components/label";
import { useLocalEcho } from "../../../hooks/use-local-echo";
import { Input } from "@pagepress/ui/components/input";


type Props = {
	value: EditorComponentNumericPropDefinition;
	onChange: (value: EditorComponentNumericPropDefinition) => void;
}
export function NumberPropertyEditorForm({ value, onChange }: Props) {
	const echo = useLocalEcho(value, onChange);
	return (
		<table className="w-full">
			<tbody>
				<tr>
					<td className="py-1 pr-2">
						<Label className="text-muted-foreground">Label</Label>
					</td>
					<td className="py-1">
						<Input type="text" value={echo.value.label} onChange={(e) => echo.onChange({ ...value, label: e.target.value })} />
					</td>
				</tr>
				<tr>
					<td className="py-1 pr-2">
						<Label className="text-muted-foreground">Default</Label>
					</td>
					<td className="py-1">
						<Input type="number" value={echo.value.default} onChange={(e) => echo.onChange({ ...value, default: Number(e.target.value) })} />
					</td>
				</tr>
				<tr>
					<td className="py-1 pr-2">
						<Label className="text-muted-foreground">Min</Label>
					</td>
					<td className="py-1">
						<Input type="number" value={echo.value.min} onChange={(e) => echo.onChange({ ...value, min: Number(e.target.value) })} />
					</td>
				</tr>
				<tr>
					<td className="py-1 pr-2">
						<Label className="text-muted-foreground">Max</Label>
					</td>
					<td className="py-1">
						<Input type="number" value={echo.value.max} onChange={(e) => echo.onChange({ ...value, max: Number(e.target.value) })} />
					</td>
				</tr>
			</tbody>
		</table>
	);
}