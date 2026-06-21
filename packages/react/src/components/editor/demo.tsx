import { Button } from "@pagepress/ui/components/button";
import { useCallback } from "react";
import { useEditor } from "../../hooks/use-editor";



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