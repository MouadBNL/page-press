import { useMemo } from "react";
import { useEditorStore } from "../../hooks/use-editor-store";
import { IconHtml, IconSquare } from "@tabler/icons-react";
import { getComponentMetadata } from "../../lib/components";



export function EditorSidebarHeader() {

	const selectedComponent = useEditorStore((s) => s.selectedComponent);

	const defintion = useMemo(() => {
		if (!selectedComponent) return {
			icon: IconSquare,
			label: 'No selected component.',
			id: null,
		};
		const data = getComponentMetadata(selectedComponent);
		return {
			icon: data.icon,
			label: data.label,
			id: selectedComponent.getId()
		}
	}, [selectedComponent]);


	return (
		<>
			<header className="flex justify-between items-center text-muted-foreground p-2 border-b">
				<div className="flex gap-1.5 items-center">
					<defintion.icon size="16" />
					<span className="text-sm">{defintion.label}</span>
				</div>

				<div>
					{defintion.id && (
						<span className="text-sm text-muted-foreground/30">#{defintion.id}</span>
					)}
				</div>
			</header>
			{/* <pre className="text-[8xp]">{JSON.stringify({
				name: selectedComponent?.getName(),
				tag: selectedComponent?.tagName,
				type: selectedComponent?.getType(),
				dd: selectedComponent?.get
			}, null, 2)}</pre> */}
		</>
	)
}

