import { useEffect, useMemo, useState } from "react";
import { useEditor } from "../../../hooks/use-editor";
import { BlockDefinition } from "@pagepress/core";
import { IconCube3dSphere } from "@tabler/icons-react";



export function EditorBlocksPanel() {
	const { editor } = useEditor();
	const [blocks, setBlocks] = useState<BlockDefinition[]>([]);


	useEffect(() => {
		const handleupdate = async () => {
			const blocks = await editor.run('blocks:list', {});
			setBlocks(blocks);
		};

		handleupdate();
		editor.on('blocks:loaded', handleupdate);
		return () => {
			editor.off('blocks:loaded', handleupdate);
		}
	}, [setBlocks]);


	const grouped = useMemo(() => {
		const grouped = new Map<string, BlockDefinition[]>();
		for (const block of blocks ?? []) {
			const category = block.category ?? 'undefined';
			const list = grouped.get(category) ?? [];
			list.push(block);
			grouped.set(category, list);
		}
		return grouped;
	}, [blocks])

	return (
		<div className="">
			{[...grouped.entries()].map(([category, categoryBlocks]) => (
				<div key={category ?? 'uncategorized'}>
					{category && <h4 className="p-3 pb-1 text-sm font-bold text-muted-foreground">{category}</h4>}
					<div className="grid grid-cols-2 gap-2 p-3 pt-1">
						{categoryBlocks.map((block) => (
							<button
								key={block.id}
								type="button"
								draggable
								onDragStart={(event) =>
									editor.run('blocks:drag-start', { blockId: block.id })
								}
								onDragEnd={() => editor.run('blocks:drag-end', {})}
								className="flex cursor-grab flex-col items-center gap-1.5 rounded-md border bg-card p-3 text-xs text-card-foreground transition-colors hover:border-ring hover:bg-accent active:cursor-grabbing"
							>
								<IconCube3dSphere className="size-8 text-muted-foreground" />
								{block.label}
							</button>
						))}
					</div>
				</div>
			))}
		</div>
	)
}