import { ScrollArea } from "@pagepress/ui/components/scroll-area";
import { useEditorStore } from "../../../hooks/use-editor-store";
import { IconAlignLeft, IconComponents, IconHash, IconLetterT, IconPhone, IconPhoto, IconPlus, IconSettings, IconTextCaption, IconTrash, IconVideo, IconX } from "@tabler/icons-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@pagepress/ui/components/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@pagepress/ui/components/popover";
import { Textarea } from "@pagepress/ui/components/textarea";
import { useEditorCmd } from "../../../hooks/use-editor-cmd";
import { debounce } from "../../../lib/debounce";
import { useEditor } from "../../../hooks/use-editor";
import { useLocalEcho } from "../../../hooks/use-local-echo";
import { Button } from "@pagepress/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@pagepress/ui/components/dropdown-menu";
import { EditorComponentDefinition, EditorComponentPropDefinition, EditorComponentPropType } from "@pagepress/core/src/modules/components/types";
import { Input } from "@pagepress/ui/components/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextPropertyEditorForm } from "../../../modules/components/forms/text-property-editor-form";
import { NumberPropertyEditorForm } from "../../../modules/components/forms/number-property-editor-form";



export function EditorComponentEditPanel() {
	const { editor } = useEditor();
	const editingComponent = useEditorStore((s) => s.editingComponent);
	const setEditingComponent = useEditorStore((s) => s.setEditingComponent);

	const { run: updateComponent } = useEditorCmd('components:update');
	const { run: addProperty } = useEditorCmd('components:property:add');


	useEffect(() => {
		const handle = ({ component }: { component: EditorComponentDefinition }) => {
			if (editingComponent && component.id === editingComponent.id) setEditingComponent(component);
		};
		editor.on('component:update', handle);
		return () => {
			editor.off('component:update', handle);
		}
	}, [editingComponent]);


	const handlePropertyAdd = (name: string, type: EditorComponentPropType) => {
		if (!editingComponent) return;
		editor.once('component:update', ({ component }) => {
			setEditingComponent(component);
		});
		addProperty({
			componentId: editingComponent.id,
			name: name,
			type: type,
		});
	};

	const handlePropertyChange = (name: string, property: EditorComponentPropDefinition) => {
		if (!editingComponent) return;
		updateComponent({
			id: editingComponent.id,
			component: {
				...editingComponent,
				properties: { ...editingComponent.properties, [name]: property },
			},
		});
	}

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

	const handlePropertyDelete = useCallback((name: string) => {
		if (!editingComponent) return;
		const cmd = structuredClone(editingComponent);
		delete cmd.properties[name];
		updateComponent({ id: editingComponent.id, component: cmd });
	}, [editingComponent]);

	if (!editingComponent) {
		return null;
	}

	return (
		<section className="flex flex-col h-full overflow-hidden">
			<header className="flex gap-2 items-center justify-between border-b p-2">
				<h1 className="flex items-center gap-2 font-medium text-sm text-foreground">
					<IconComponents size={20} />
					{editingComponent.label}
				</h1>

				<span className="text-sm text-muted-foreground">#{editingComponent.id}</span>
			</header>
			<ScrollArea className="flex-1 overflow-auto">
				<article>
					<header className="flex items-center justify-between border-b px-2 py-1">
						<h3 className="text-sm font-bold">Properties</h3>
						<PropertyPlusButton onSelect={handlePropertyAdd} />
					</header>
					<main className="p-2">
						<div className="grid grid-cols-1">
							{Object.entries(editingComponent.properties).map(([key, property]) => (
								<div key={key}>
									<Popover>
										<PopoverTrigger asChild>
											<div className="p-1 bg-background hover:bg-muted/50 rounded-sm flex items-center justify-between w-full">
												<div className="flex items-center gap-1">
													<IconLetterT size={12} />
													<p className="text-sm">{property.label}</p>
												</div>
												<div className="flex items-center gap-1">
													<span className="text-xs text-muted-foreground">{`{{${key}}}`}</span>
												</div>
											</div>
										</PopoverTrigger>
										<PopoverContent className="w-(--radix-popover-trigger-width) p-0 gap-0">
											<header className="flex items-center justify-between border-b px-3 py-2">
												<h3 className="text-sm font-bold">Property Settings</h3>
												<button className="p-1 hover:bg-muted/50 rounded-sm">
													<IconX size={12} />
												</button>
											</header>
											<main className="px-3 py-2">
												<PropertyEditorForm
													property={property}
													onChange={(p) => handlePropertyChange(key, p)}
												/>
											</main>
											<footer className="flex items-center justify-end border-t px-3 py-2">
												<Button size="sm" variant="destructive" onClick={() => handlePropertyDelete(key)}>
													<IconTrash size={12} />
													Delete
												</Button>
											</footer>
										</PopoverContent>
									</Popover>
								</div>
							))}
						</div>
					</main>
				</article>



				<Accordion type="multiple" defaultValue={['properties', 'content']} className="rounded-none border-none">


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
		</section>
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


type PropertyPlusButtonProps = {
	onSelect?: (name: string, type: EditorComponentPropType) => void;
}
function PropertyPlusButton({ onSelect }: PropertyPlusButtonProps) {

	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);
	const handleSelect = (e: Event, type: EditorComponentPropType) => {
		e.preventDefault();
		setError(null);
		const name = inputRef.current?.value;
		if (!name) {
			setError('Name is required');
			return;
		}
		setError(null);
		onSelect?.(name, type);
		setOpen(false);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	}
	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<IconPlus size={12} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-64">
				<DropdownMenuLabel>Name</DropdownMenuLabel>
				<DropdownMenuLabel>
					<Input placeholder="Enter property name" ref={inputRef} className={error ? 'border-destructive' : ''} />
					{error && <p className="text-xs text-destructive">{error}</p>}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={(e) => handleSelect(e, 'text')}>
					<IconLetterT size={12} />
					Text
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={(e) => handleSelect(e, 'numeric')}>
					<IconHash size={12} />
					Number
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<IconAlignLeft size={12} />
					Textarea
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<IconTextCaption size={12} />
					Rich text
				</DropdownMenuItem>

				<DropdownMenuItem disabled>
					<IconPhoto size={12} />
					Image
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<IconVideo size={12} />
					Video
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}



type PropertyEditorFormProps = {
	property: EditorComponentPropDefinition;
	onChange: (property: EditorComponentPropDefinition) => void;
}
export function PropertyEditorForm({ property, onChange }: PropertyEditorFormProps) {

	switch (property.type) {
		case 'text':
			return <TextPropertyEditorForm value={property} onChange={onChange} />;
		case 'numeric':
			return <NumberPropertyEditorForm value={property} onChange={onChange} />;
		default:
			return (
				<div className="flex items-center gap-1">
					<p>Unsupported property type: {(property as any).type}</p>
				</div>
			);
	}
}