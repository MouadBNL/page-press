import { DEFAULT_BLOCKS } from "@pagepress/core"
import { Editor } from "@pagepress/react"
import { Button } from "@pagepress/ui/components/button"
import { ComponentIcon, ToyBrickIcon } from "lucide-react"

function App() {

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Editor.Root className="flex-1 overflow-hidden" blocks={DEFAULT_BLOCKS}>
        <header className="flex justify-end p-2 border-b">
          <Editor.Gate>
            <Editor.Demo />
          </Editor.Gate>
          <Button>Save</Button>
        </header>
        <Editor.Layout>
          <Editor.Sidebar side="left" defaultSize="15%">
            <Editor.Panel id="blocks" label="Blocks" icon={<ToyBrickIcon className="size-4"  />}>
              <Editor.Panels.Blocks />
            </Editor.Panel>
            <Editor.Panel id="components" label="Components" icon={<ComponentIcon  className="size-4" />}>
              Components
            </Editor.Panel>
          </Editor.Sidebar>
          <Editor.Canvas className="flex-1 flex flex-col h-full overflow-hidden" />
          <Editor.Sidebar side="right" defaultSize="20%">
            <h3>Right sidebar</h3>
          </Editor.Sidebar>
        </Editor.Layout>
      </Editor.Root>
    </div>
  )
}

export default App
