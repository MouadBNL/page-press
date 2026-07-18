import { ScrollArea } from "@pagepress/ui/components/scroll-area";
import { useEditorStore } from "../../../hooks/use-editor-store";
import { IconComponents, IconLetterT, IconSettings } from "@tabler/icons-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@pagepress/ui/components/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@pagepress/ui/components/popover";
import { Textarea } from "@pagepress/ui/components/textarea";
import { useEditorCmd } from "../../../hooks/use-editor-cmd";
import { debounce } from "../../../lib/debounce";
import { useEditor } from "../../../hooks/use-editor";
import { useLocalEcho } from "../../../hooks/use-local-echo";



export function EditorComponentEditPanel() {
	const { editor } = useEditor();
	const editingComponent = useEditorStore((s) => s.editingComponent);
	const setEditingComponent = useEditorStore((s) => s.setEditingComponent);

	const { run: updateComponent } = useEditorCmd('components:update');



	const handleContentChange = (value: string) => {
		if (!editingComponent) return;
		updateComponent({
			id: editingComponent.id,
			component: {
				...editingComponent,
				content: value,
			},
		});
	};

	if (!editingComponent) {
		return null;
	}

	return (
		<article className="flex flex-col h-full overflow-hidden">
			<header className="flex gap-2 items-center justify-between border-b p-2">
				<h1 className="flex items-center gap-2 font-medium text-sm text-foreground">
					<IconComponents size={20} />
					{editingComponent.label}
				</h1>

				<span className="text-sm text-muted-foreground">#{editingComponent.id}</span>
			</header>
			<ScrollArea className="flex-1 overflow-auto">
				<Accordion type="multiple" defaultValue={['properties', 'content']} className="rounded-none border-none">
					<AccordionItem value="properties" className="data-open:bg-muted/0">
						<AccordionTrigger className="text-sm font-bold">Properties</AccordionTrigger>
						<AccordionContent>
							<div className="grid grid-cols-1">
								{Object.entries(editingComponent.properties).map(([key, property]) => (
									<div key={key} className="p-1 bg-background hover:bg-muted/50 rounded-sm flex items-center justify-between">
										<div className="flex items-center gap-1">
											<IconLetterT size={12} />
											<p className="text-sm">{property.label}</p>
										</div>

										<Popover>
											<PopoverTrigger asChild>
												<IconSettings size={12} className="text-muted-foreground" />
											</PopoverTrigger>
											<PopoverContent>
												<pre className="text-xs text-foreground">{JSON.stringify(property, null, 2)}</pre>
											</PopoverContent>
										</Popover>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="content" className="data-open:bg-muted/0">
						<AccordionTrigger className="text-sm font-bold">Content</AccordionTrigger>
						<AccordionContent>
							<ComponentContentEditor
								content={editingComponent.content}
								onChange={handleContentChange}
							/>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</ScrollArea>
		</article>
	)
}


type ComponentContentEditorProps = {
	content: string;
	onChange: (value: string) => void;
}
function ComponentContentEditor({ content, onChange }: ComponentContentEditorProps) {
	"use no memo";
	const echo = useLocalEcho(content, onChange);

	return (
		<Textarea
			className="w-full h-full"
			value={echo.value}
			onChange={(e) => echo.onChange(e.target.value)}
			onFocus={echo.onFocus}
			onBlur={echo.onBlur}
		/>
	)
}