import { Button } from "@pagepress/ui/components/button";
import { useEditor } from "../hooks/use-editor";
import { useCallback } from "react";



export function EditorDemo() {

	const { editor } = useEditor();

	const handleClick = useCallback(() => {
		editor.run('components:add-demo', {title: "Testing demo"});
	}, [editor]);

	return (
		<Button onClick={handleClick}>
			Add Demo Element
		</Button>
	)
}