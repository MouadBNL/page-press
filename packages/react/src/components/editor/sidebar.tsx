import { ResizableHandle, ResizablePanel } from "@pagepress/ui/components/resizable";
import React, { Children, isValidElement, ReactNode } from "react";
import { PanelDefintion } from "../../types";
import { useEditorStore } from "../../hooks/use-editor-store";
import { cn } from "@pagepress/ui/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@pagepress/ui/components/tabs";


type Props = React.PropsWithChildren<{
	side: "left" | "right",
	defaultSize?: number | string | undefined;
}>;
export function EditorSidebar({ children, side, defaultSize }: Props) {

	const registerPanels = useEditorStore((s) => s.registerPanel);
	const registeredPanels = useEditorStore((s) => s.panels);
	const activePanel = useEditorStore((s) => (side === 'left' ? s.leftSiderbarPanel : s.rightSiderbarPanel));
	const togglePanel = useEditorStore((s) => (side === 'left' ? s.toggleLeftSiderbarPanel : s.toggleRightSiderbarPanel));

	const panels = extractPanelDefs(children);


	const handleToggle = (panelId: string) => {
		togglePanel(panelId);
	};

	const activePanelContent = findActivePanelContent(children, activePanel);

	return (
		<>
			{side == 'right' && activePanel && (
				<ResizableHandle withHandle />
			)}
			{side == 'left' && (
				<SidebarRail panels={panels} activePanel={activePanel} onPanelToggle={handleToggle} side={side} />
			)}

			{activePanel && (
				<ResizablePanel defaultSize={defaultSize}>
					{activePanelContent}
				</ResizablePanel>
			)}

			{side == 'left' && activePanel && (
				<ResizableHandle withHandle />
			)}
			{side == 'right' && (
				<SidebarRail panels={panels} activePanel={activePanel} onPanelToggle={handleToggle} side={side} />
			)}
		</>
	)
}






type SidebarRailProps = {
	panels: PanelDefintion[];
	activePanel: string | null;
	onPanelToggle: (panelId: string) => void;
	side: "left" | "right";
};
export function SidebarRail({
	panels,
	activePanel,
	onPanelToggle,
	side,
}: SidebarRailProps) {

	return (
		<div
			className={cn(
				"h-full w-10 shrink-0 flex flex-col items-center py-2 gap-1 bg-card",
				side === "right" && "border-l border-border",
				side === "left" && "border-r border-border",
			)}
		>
			{panels.map((panel) => (
				<button
					key={panel.id}
					onClick={() => onPanelToggle(panel.id)}
					className={cn(
						"relative w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150",
						activePanel === panel.id
							? "bg-white/10 text-white shadow-sm"
							: "text-white/25 hover:text-white/50 hover:bg-white/5",
					)}
					title={panel.label}
				>
					{panel.icon}
					{activePanel === panel.id && (
						<div
							className={cn(
								"absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded bg-blue-400",
								side === "right" && "right-0 rounded-l",
								side === "left" && "left-0 rounded-r",
							)}
						/>
					)}
				</button>
			))}
		</div>
	);
}


function extractPanelDefs(children: ReactNode): PanelDefintion[] {
	const defs: PanelDefintion[] = [];
	Children.forEach(children, (child) => {
		if (isValidElement<PanelDefintion>(child) && child.props.id) {
			defs.push({
				id: child.props.id,
				icon: child.props.icon,
				label: child.props.label,
			});
		}
	});
	return defs;
}



function findActivePanelContent(children: ReactNode, activePanel: string | null): ReactNode {
	if (!activePanel) return null;
	let content: ReactNode = null;
	Children.forEach(children, (child) => {
		if (isValidElement<PanelDefintion>(child) && child.props.id === activePanel) {
			content = child;
		}
	});
	return content;
}
