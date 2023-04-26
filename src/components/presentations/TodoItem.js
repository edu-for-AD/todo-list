import { useState } from 'react'

function TodoItem({ id, text, deleteTodo }) {
  const [archive, setArchive] = useState(false)
  const handleOnClickArchive = () => {
    setArchive(true)
  }
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div>{text}</div>
      <button
        style={archive ? null : { display: 'none' }}
        onClick={() => {
          deleteTodo(id)
        }}
      >
        delete
      </button>
      <button style={archive ? { display: 'none' } : null}>edit</button>

      <button
        style={archive ? { display: 'none' } : null}
        onClick={handleOnClickArchive}
      >
        archive
      </button>
    </div>
  )
}

export default TodoItem
