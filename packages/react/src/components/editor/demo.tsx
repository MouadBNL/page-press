import { Button } from "@pagepress/ui/components/button";
import { useCallback } from "react";
import { useEditor } from "../../hooks/use-editor";



export function EditorDemo() {

	const { editor } = useEditor();

	const handleClick = useCallback(() => {
		editor.run('elements:add-demo', { title: "Testing demo" });
	}, [editor]);

	const handleDebug = useCallback(async () => {
		const selected = editor.run('elements:get-selected');
		const name = selected?.getTrait('name')!;
		const fee = selected?.getTrait('fee')!;
		console.log("Debug", {
			name: name.getValue(),
			fee: fee.getValue(),
		});
		fee.setValue('250 $');
		name.setValue('Updated name.');
		console.log("Debug", {
			name: name.getValue(),
			fee: fee.getValue(),
		});
		console.log("selected", selected);
	}, [editor]);


	const handleSpotlight = useCallback(() => {
		editor.run('spotlight:enable');
	}, [editor]);

	return (
		<>
			<Button onClick={handleClick}>
				Add Demo Element
			</Button>


			<Button onClick={handleDebug}>
				Debug
			</Button>

			<Button onClick={handleSpotlight}>
				Spotlight
			</Button>
		</>
	)
}