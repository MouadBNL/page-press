import { LayerTreeNode } from "@pagepress/core";
import { useEditorStore } from "../../../hooks/use-editor-store";
import { useEditorCmd } from "../../../hooks/use-editor-cmd";
import { useMemo } from "react";
import { getComponentMetadata } from "../../../lib/components";
import { cn } from "@pagepress/ui/lib/utils";
import { IconChevronDown, IconChevronRight, IconEye, IconEyeOff, IconLock, IconLockOpen } from "@tabler/icons-react";
import { ScrollArea } from "@pagepress/ui/components/scroll-area";



export function EditorLayersPanel() {

	const layerTree = useEditorStore((state) => state.layerTree);

	return (
		<section className="flex flex-col h-full overflow-hidden">
			<header className="p-2 border-b">
				<h1 className="text-xs font-bold">Navigator</h1>
			</header>

			<ScrollArea className="flex-1 overflow-auto">
				<div className="flex flex-col gap-0.5 p-2">
				{layerTree && (
					<LayerItem layer={layerTree} />
				)}
				</div>
			</ScrollArea>

		</section>
	)
}


function LayerItem({ layer }: { layer: LayerTreeNode }) {
	const hoverCmd = useEditorCmd('layers:hover');
	const selectCmd = useEditorCmd('components:select');
	const toggleVisibilityCmd = useEditorCmd('layers:toggle-visibility');
	const toggleExpandCmd = useEditorCmd('layers:toggle-expand');
	const toggleLockCmd = useEditorCmd('layers:toggle-lock');

	const handleHover = (hovered: boolean) => {
		hoverCmd.run({
			component: layer.component,
			hovered,
		});
	};


	const handleSelect = () => {
		selectCmd.run({
			component: layer.component,
		});
	};

	const handleToggleVisibility = (visible: boolean) => {
		toggleVisibilityCmd.run({
			component: layer.component,
			visible,
		});
	};

	const handleToggleExpand = (open: boolean) => {
		toggleExpandCmd.run({
			component: layer.component,
			open,
		});
	};

	const handleToggleLock = (locked: boolean) => {
		toggleLockCmd.run({
			component: layer.component,
			locked,
		});
	};

	const defintion = useMemo(() => {
		const data = getComponentMetadata(layer.component);
		return {
			icon: data.icon,
			label: data.label,
			id: layer.component.getId()
		}
	}, [layer.component]);



	return (
		<>
			<div
				className={cn("py-0.5 px-2 rounded-md flex items-center justify-between group",
					!layer.selected && "hover:bg-muted/50",
					layer.selected && "bg-primary-light/10 text-blue-300",
				)}
				style={{ paddingLeft: layer.level * 8 }}
				onMouseEnter={() => handleHover(true)}
				onMouseLeave={() => handleHover(false)}
				onClick={handleSelect}
			>
				<div className="flex gap-1 items-center px-2">
					<div className="flex items-center">
					{layer.open && (
						<IconChevronDown
							size="10"
							className="cursor-pointer"
							onClick={() => handleToggleExpand(false)}
						/>
					)}
					{!layer.open && layer.children.length > 0 && (
						<IconChevronRight
							size="10"
							className="cursor-pointer"
							onClick={() => handleToggleExpand(true)}
						/>
					)}
					{layer.children.length === 0 && (
						<div className="w-[10px] h-[10px]" />
					)}
					</div>
					<defintion.icon size="12" />
					<span className="text-xs font-normal">{defintion.label}</span>
				</div>

				<div className="flex items-center gap-1">
					{layer.visible ? (
						<IconEye size="12" className="opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => handleToggleVisibility(false)} />
					) : (
						<IconEyeOff size="12" className="text-muted-foreground cursor-pointer" onClick={() => handleToggleVisibility(true)} />
					)}

					{layer.locked ? (
						<IconLock size="12" className="text-muted-foreground cursor-pointer" onClick={() => handleToggleLock(false)} />
					) : (
						<IconLockOpen size="12" className="opacity-0 group-hover:opacity-100  cursor-pointer" onClick={() => handleToggleLock(true)} />
					)}
				</div>
			</div>
			{layer.open && layer.children.map(child => (
				<LayerItem key={child.id} layer={child} />
			))}
		</>
	)
}