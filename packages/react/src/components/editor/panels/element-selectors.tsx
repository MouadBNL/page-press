
import { useEditorStore } from "../../../hooks/use-editor-store";
import { cn } from "@pagepress/ui/lib/utils";
import { SelectorBadge, SelectorStyleBadge } from "../../ui/selector-badge";
import { useCallback, useRef, useState } from "react";
import { CommandGroup, CommandItem, CommandList, CommandPrimitive } from "@pagepress/ui/components/command";
import { Popover, PopoverAnchor, PopoverContent } from "@pagepress/ui/components/popover";
import { useEditor } from "../../../hooks/use-editor";
import { Selector } from "@pagepress/core";

type Props = Omit<React.ComponentProps<"div">, "children">;
export function EditorElementSelectorsPanel({ className, ...props }: Props) {
	const selectorInputRef = useRef<HTMLInputElement>(null);
	const selectors = useEditorStore((s) => s.selectors);
	const { editor } = useEditor();

	const [query, setQuery] = useState('');
	const [popoverOpen, setPopoverOpen] = useState(false);


	const togglePopover = (next: boolean) => {
		if (!next) {
			// selectorInputRef.current?.blur();
			setPopoverOpen(false);
			setQuery('');
		}
		else {
			// selectorInputRef.current?.focus();
			setPopoverOpen(true);
		}
	}


	const handleAddSelected = useCallback(() => {
		console.log('handleAddSelected', query);
		editor.run('selectors:add-selected', { selector: { name: query, type: 'class' } });
		togglePopover(false);
		selectorInputRef.current?.blur();
	}, [query]);

	const handleRemoveSelected = useCallback((selector: Selector) => {
		console.log('handleRemoveSelected', selector);
		editor.run('selectors:remove-selected', { name: selector.name });
	}, []);


	return (
		<div className={cn("p-2", className)} {...props}>
			<span className="text-muted-foreground text-sm">
				Style selectors
			</span>




			<Popover open={popoverOpen} onOpenChange={(next) => togglePopover(next)}>
				<PopoverAnchor asChild>
					<div
						className="flex gap-1 flex-wrap bg-muted rounded-sm p-1 border focus-within:border-primary-light"
						onClick={() => { selectorInputRef.current?.focus() }}
					>
						<SelectorStyleBadge />
						{selectors.map(selector => (
							<SelectorBadge key={selector.name} selector={selector} onRemove={() => handleRemoveSelected(selector)} />
						))}
						<input type="text" ref={selectorInputRef}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="text-xs focus:ring-0 focus:outline-none shrink  w-0 focus:w-auto flex-1"
							onFocus={() => togglePopover(true)}
							onBlur={() => togglePopover(false)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleAddSelected();
								}
								if(e.key == 'Backspace') {
									handleRemoveSelected(selectors[selectors.length - 1]);
								}
							}}
						/>
					</div>
				</PopoverAnchor>

				<PopoverContent
					align="start"
					onOpenAutoFocus={(e) => e.preventDefault()}
					onCloseAutoFocus={(e) => { e.preventDefault() }}
					onMouseDown={(e) => e.preventDefault()} 
					onFocusOutside={(e) => {
						// focus moving to the input/anchor is NOT "outside" — keep open
						if (selectorInputRef.current?.contains(e.target as Node)) {
							e.preventDefault();
						}
					}}
					onInteractOutside={(e) => {
						// same guard for pointer interactions on the anchor row
						if (selectorInputRef.current?.contains(e.target as Node)) {
							e.preventDefault();
						}
					}}
					className="w-(--radix-popover-trigger-width) p-1"
				>
					<CommandPrimitive>
						<CommandList>
							<CommandGroup heading="Create new selector">
								{query ? (
									<CommandItem onSelect={handleAddSelected}>
										<div className="flex items-center gap-1">
											<span className="text-xs text-foreground">Create</span>
											<SelectorBadge selector={{ name: query, type: 'class', active: true, label: query }} />
										</div>
									</CommandItem>
								) : (
									<p className="text-xs text-foreground px-2.5 py-1.5">Start typing to create a new selector</p>
								)}
							</CommandGroup>
						</CommandList>
					</CommandPrimitive>
				</PopoverContent>
			</Popover>

			<ul>
				{selectors.map(selector => (
					<li key={selector.name}>{selector.name}</li>
				))}
			</ul>

			<pre>{JSON.stringify(selectors, null, 2)}</pre>
		</div>
	)
}

