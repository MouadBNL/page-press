import { DEFAULT_BLOCKS } from "@pagepress/core"
import { Editor } from "@pagepress/react"
import { Button } from "@pagepress/ui/components/button"
import { IconBox, IconComponents } from "@tabler/icons-react"

function App() {

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Editor.Root className="flex flex-col overflow-hidden" blocks={DEFAULT_BLOCKS}>
        <header className="flex justify-end p-2 border-b">
          <Editor.Gate>
            <Editor.Demo />
          </Editor.Gate>
          <Button>Save</Button>
        </header>
        <Editor.Layout>
          <Editor.ActivityBar side="left" defaultSize="15%">
            <Editor.ActivityBarItem id="blocks" label="Blocks" icon={<IconBox className="size-5" />}>
              <Editor.Panels.Blocks />
            </Editor.ActivityBarItem>
            <Editor.ActivityBarItem id="components" label="Components" icon={<IconComponents className="size-5" />}>
              Components
            </Editor.ActivityBarItem>
          </Editor.ActivityBar>
          <Editor.Canvas className="flex-1 flex flex-col h-full overflow-hidden" />
          <Editor.Sidebar defaultSize="20%">
            <Editor.SidebarHeader />
            <Editor.SidebarTabs>
              <Editor.SidebarTabItem label="Styles" id="element-styles">
                <Editor.Panels.ElementSelectors />
                <Editor.Panels.ElementStyles />
              </Editor.SidebarTabItem>
              <Editor.SidebarTabItem label="Settings" id="element-settings">
                <Editor.Panels.ElementSettings />
              </Editor.SidebarTabItem>
            </Editor.SidebarTabs>
          </Editor.Sidebar>
        </Editor.Layout>
      </Editor.Root>
    </div>
  )
}

export default App
