import { EditorComponentPropDefinition, EditorComponentTextPropDefinition } from "@pagepress/core/src/modules/components/types";
import { Input } from "@pagepress/ui/components/input";
import { useLocalEcho } from "../../../hooks/use-local-echo";
import { Label } from "@pagepress/ui/components/label";


type Props = {
	value: EditorComponentTextPropDefinition;
	onChange: (value: EditorComponentTextPropDefinition) => void;
}
export function TextPropertyEditorForm({ value, onChange }: Props) {

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
						<Input type="text" value={echo.value.default} onChange={(e) => echo.onChange({ ...value, default: e.target.value })} />
					</td>
				</tr>
				<tr>
					<td className="py-1 pr-2">
						<Label className="text-muted-foreground">Placeholder</Label>
					</td>
					<td className="py-1">
						<Input type="text" value={echo.value.placeholder} onChange={(e) => echo.onChange({ ...value, placeholder: e.target.value })} />
					</td>
				</tr>
			</tbody>
		</table>
	);
}