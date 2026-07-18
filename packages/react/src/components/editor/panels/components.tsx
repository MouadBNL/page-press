import { ScrollArea } from "@pagepress/ui/components/scroll-area";
import { useEditorStore } from "../../../hooks/use-editor-store";
import { IconComponents } from "@tabler/icons-react";
import { EditorComponentDefinition } from "@pagepress/core/src/modules/components";
import { cn } from "@pagepress/ui/lib/utils";
import { useEditor } from "../../../hooks/use-editor";



export function EditorComponentsPanel() {
	const { editor } = useEditor();
	const components = useEditorStore((s) => s.components);
	
	return (
		<section className="flex flex-col h-full overflow-hidden">
			<header className="flex items-center justify-between border-b p-2">
				<h1 className="text-sm font-bold">Components</h1>
				<div></div>
			</header>

			<ScrollArea className="flex-1">
				<div className="grid grid-cols-1 gap-1 p-2">
					{components.map((component) => (
						<ComponentCard 
							key={component.id} component={component} 
							draggable
							onDragStart={() => editor.run('components:drag-start', { componentId: component.id })}
							onDragEnd={() => editor.run('components:drag-end')}
						/>
					))}
				</div>
			</ScrollArea>
		</section>
	)
}


type ComponentCardProps = React.ComponentProps<"button"> & {
	component: EditorComponentDefinition;
}
function ComponentCard({ component, className, ...props }: ComponentCardProps) {
	return (
		<button className={cn("flex items-center justify-between p-1.5 hover:bg-muted rounded-md", className)} {...props}>
			<div className="flex items-center gap-2">
				<IconComponents className="size-3.5" />
				<h3 className="text-xs">{component.label}</h3>
			</div>
		</button>
	)
}