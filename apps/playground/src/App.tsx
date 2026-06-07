import { Editor } from "@pagepress/react"
import { Button } from "@pagepress/ui/components/button"

function App() {

  return (
    <Editor.Root>
      <header className="flex justify-end p-2 border-b">
        <Editor.Gate>
          <Editor.Demo />
        </Editor.Gate>
        <Button>Save</Button>

      </header>
      <Editor.Canvas />
    </Editor.Root>
  )
}

export default App
