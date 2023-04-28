import { useState } from 'react'

function TodoItem({ id, text, deleteTodo, changeTodo }) {
  const [archive, setArchive] = useState(false)
  const [edit, setEdit] = useState(false)
  const [todo, setTodo] = useState(text)

  const handleArchive = () => {
    setArchive((current) => !current)
  }
  const handleEdit = () => {
    setEdit((current) => !current)
    setTodo(text)
  }
  const handleConfirm = () => {
    setEdit((current) => !current)
    changeTodo(id)
    console.log('confirm')
  }
  const handleChange = (event) => {
    setTodo(event.target.value)
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {edit ? (
        <input type="text" value={todo} onChange={handleChange} /> // edit
      ) : (
        <div style={{ opacity: archive ? '0.3' : '' }}>{text}</div> // unedit
      )}

      {!archive && !edit && <button onClick={handleEdit}>edit</button>}

      {!edit && (
        <button onClick={handleArchive}>
          {!archive ? 'archive' : 'unarchive'}
        </button>
      )}

      {archive && (
        <button
          onClick={() => {
            deleteTodo(id)
          }}
        >
          delete
        </button>
      )}

      {edit && (
        <>
          <button onClick={handleConfirm}>confirm</button>
          <button onClick={handleEdit}>cancel</button>
        </>
      )}
    </div>
  )
}

export default TodoItem
