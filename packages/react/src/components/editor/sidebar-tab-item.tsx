import { cn } from "@pagepress/ui/lib/utils"
import React from "react"
import { SidebarPanels } from "../../types";




export type EditorSidebarTabItemProps = React.ComponentProps<"div"> & {
	id: SidebarPanels,
	label: string,
};
export function EditorSidebarTabItem({className, id, ...props}: EditorSidebarTabItemProps) {

	return <div className={cn("flex-1 lex-1 min-h-0 overflow-auto flex flex-col h-full", className)} {...props} id={id}/>
}