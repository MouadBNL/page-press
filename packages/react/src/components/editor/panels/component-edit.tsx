import { ScrollArea } from "@pagepress/ui/components/scroll-area";
import { useEditorStore } from "../../../hooks/use-editor-store";



export function EditorComponentEditPanel() {
	const editingComponent = useEditorStore((s) => s.editingComponent);

	if (!editingComponent) {
		return null;
	}

	return (
		<article className="flex flex-col h-full overflow-hidden">
			<ScrollArea className="flex-1 overflow-auto">
				<div className="grid grid-cols-1">
					<p>Editing {editingComponent.label}</p>
					<pre className="text-xs">{JSON.stringify(editingComponent, null, 2)}</pre>
				</div>
			</ScrollArea>
		</article>
	)
}