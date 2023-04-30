import { useState } from 'react'

function TodoItem({
  id,
  text,
  deleteTodo,
  editState,
  editStateCheck,
  cancelCheck,
  changeTodo
}) {
  const [todo, setTodo] = useState('')
  const [archive, setArchive] = useState(false)

  const handleArchive = () => {
    setArchive((prev) => !prev)
  }

  const handleEdit = () => {
    editStateCheck(id)
    setTodo(text)
  }
  const handleConfirm = (event) => {
    changeTodo(id, todo)
  }

  const handleCancel = () => {
    cancelCheck(id)
    setTodo(text)
  }

  const handleDelete = () => {
    deleteTodo(id)
  }
  const handleChange = (event) => {
    setTodo(event.target.value)
  }
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {editState ? (
        <input type="text" value={todo} onChange={handleChange} />
      ) : (
        <div style={{ opacity: archive ? '0.3' : '' }}>{text}</div>
      )}

      {!archive && !editState && <button onClick={handleEdit}>edit</button>}

      {!editState && (
        <button onClick={handleArchive}>
          {!archive ? 'archive' : 'unarchive'}
        </button>
      )}

      {archive && <button onClick={handleDelete}>delete</button>}

      {editState && (
        <>
          <button onClick={handleConfirm}>confirm</button>
          <button onClick={handleCancel}>cancel</button>
        </>
      )}
    </div>
  )
}

export default TodoItem
