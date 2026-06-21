import { ResizableHandle, ResizablePanel } from "@pagepress/ui/components/resizable";
import React from "react";

type Props = React.PropsWithChildren<{
	defaultSize?: number | string | undefined;
}>;
export function EditorSidebar({ children, defaultSize }: Props) {
	return (
		<>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={defaultSize} className="flex-1 h-full flex flex-col overflow-hidden ">
				{children}
			</ResizablePanel>
		</>
	)
}



