import { DEFAULT_BLOCKS, DemoComponent } from "@pagepress/core"
import { Editor } from "@pagepress/react"
import { Button } from "@pagepress/ui/components/button"
import { IconBox, IconComponents, IconListTree } from "@tabler/icons-react"

function App() {

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Editor.Root className="flex flex-col overflow-hidden" blocks={DEFAULT_BLOCKS} components={[DemoComponent]}>
        <header className="flex justify-end p-2 border-b">
          <Editor.Gate>
            <Editor.Demo />
          </Editor.Gate>
          <Button>Save</Button>
        </header>
        <Editor.Layout>
          <Editor.ActivityBar side="left" defaultSize="15%">
            <Editor.ActivityBarItem id="layers" label="Navigator" icon={<IconListTree className="size-5" />}>
              <Editor.Panels.Layers />
            </Editor.ActivityBarItem>
            <Editor.ActivityBarItem id="blocks" label="Blocks" icon={<IconBox className="size-5" />}>
              <Editor.Panels.Blocks />
            </Editor.ActivityBarItem>
            <Editor.ActivityBarItem id="components" label="Components" icon={<IconComponents className="size-5" />}>
              Components
            </Editor.ActivityBarItem>

            <Editor.ActivityBarItem id="component-edit" label="Component Edit" icon={<IconComponents />}>
              <Editor.Panels.ComponentEdit />
            </Editor.ActivityBarItem>


          </Editor.ActivityBar>
          <Editor.Canvas className="flex-1 flex flex-col h-full overflow-hidden" />
          <Editor.Sidebar defaultSize="20%">
            <Editor.SidebarHeader />
            <Editor.SidebarTabs>
              <Editor.SidebarTabItem label="Styles" id="element-styles">
                <Editor.Panels.ElementSelectors className="border-b"/>
                <Editor.Panels.ElementStyles />
              </Editor.SidebarTabItem>
              <Editor.SidebarTabItem label="Settings" id="element-settings">
                <Editor.Panels.ElementProperties />
              </Editor.SidebarTabItem>
            </Editor.SidebarTabs>
          </Editor.Sidebar>
        </Editor.Layout>
      </Editor.Root>
    </div>
  )
}

export default App
