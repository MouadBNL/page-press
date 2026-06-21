import { ResizablePanelGroup } from "@pagepress/ui/components/resizable";
import React from "react";

type Props = React.PropsWithChildren;
export function EditorLayout({children}: Props) {

	return (
		<ResizablePanelGroup orientation="horizontal" >
			{children}
		</ResizablePanelGroup>
	)
}