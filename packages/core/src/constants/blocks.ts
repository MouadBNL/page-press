import { BlockDefinition } from "../modules/blocks";



export const DEFAULT_BLOCKS: BlockDefinition[] = [
	{
    id: 'heading',
    label: 'Heading',
    category: 'Basic',
    content: '<h2>Heading</h2>',
  },
  {
    id: 'text',
    label: 'Text',
    category: 'Basic',
    content: '<p>Insert your text here.</p>',
  },
  {
    id: 'button',
    label: 'Button',
    category: 'Basic',
    content:
      '<a style="display:inline-block;padding:.6rem 1.2rem;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none">Click me</a>',
  },
  {
    id: 'image',
    label: 'Image',
    category: 'Media',
    content: '<img src="https://placehold.co/600x300" style="max-width:100%" alt="Placeholder" />',
  },
  {
    id: 'columns',
    label: '2 Columns',
    category: 'Layout',
    content:
      '<div style="display:flex;gap:1rem;padding:1rem"><div style="flex:1;padding:1rem;background:#f3f4f6">Left</div><div style="flex:1;padding:1rem;background:#f3f4f6">Right</div></div>',
  },
]