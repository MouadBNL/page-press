import { ResizableHandle, ResizablePanel } from "@pagepress/ui/components/resizable";
import React from "react";


type Props = React.PropsWithChildren<{
	side: "left" | "right",
	defaultSize?: number | string | undefined;
}>;
export function EditorSidebar({ children, side, defaultSize }: Props) {

	return (
		<>
			{side == 'right' && (
				<ResizableHandle withHandle />
			)}
			<ResizablePanel defaultSize={defaultSize}>
				{children}
			</ResizablePanel>
			{side == 'left' && (
				<ResizableHandle withHandle />
			)}
		</>
	)
}