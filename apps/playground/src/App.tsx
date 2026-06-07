import { useState } from 'react'
import { Button } from '@pagepress/react'
import { test } from '@pagepress/core'

function App() {
  const [count, setCount] = useState(100);

  const inc = () => {
    setCount(p => p+1);
  }

  return (
    <main>
      <Button onClick={inc}>Count {count}</Button>
      <Button onClick={test}>Test</Button>
    </main>
  )
}

export default App
