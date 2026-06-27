import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pagepress/ui/components/tabs"
import { useEditorStore } from "../../hooks/use-editor-store"
import { SidebarPanels } from "../../types";
import { Children, isValidElement, ReactNode } from "react";
import { EditorSidebarTabItemProps } from "./sidebar-tab-item";




type Props = React.PropsWithChildren<{

}>
export function EditorSidebarTabs({ children }: Props) {

	const sidebarPanel = useEditorStore((s) => s.sidebarPanel);
	const toggleSidebarPanel = useEditorStore((s) => s.toggleSidebarPanel);

	const tabs = extractTabsDefs(children);
	const content = findActiveTabContent(children, sidebarPanel);


	return (
		<div className="h-full overflow-hidden flex flex-col">
			<Tabs value={sidebarPanel} onValueChange={(v) => toggleSidebarPanel(v as SidebarPanels)}>
				<TabsList variant="line" className="p-0 w-full border-b">
					{tabs.map(tab => (
						<TabsTrigger value={tab.id} key={tab.id}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
			<div className="flex-1 h-full overflow-auto">
				{content}
			</div>
		</div>
	)
}




function extractTabsDefs(children: ReactNode): EditorSidebarTabItemProps[] {
	const defs: EditorSidebarTabItemProps[] = [];
	Children.forEach(children, (child) => {
		if (isValidElement<EditorSidebarTabItemProps>(child) && child.props.id) {
			defs.push({
				id: child.props.id,
				// icon: child.props.icon,
				label: child.props.label,
			});
		}
	});
	return defs;
}



function findActiveTabContent(children: ReactNode, activePanel: string | null): ReactNode {
	if (!activePanel) return null;
	let content: ReactNode = null;
	Children.forEach(children, (child) => {
		if (isValidElement<EditorSidebarTabItemProps>(child) && child.props.id === activePanel) {
			content = child;
		}
	});
	return content;
}