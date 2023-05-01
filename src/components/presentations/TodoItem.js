import { useState } from 'react'

function TodoItem({
  id,
  text,
  deleteTodo,
  editing,
  changeEditingStatus,
  cancelTodo,
  confirmTodo
}) {
  const [todo, setTodo] = useState('')
  const [archive, setArchive] = useState(false)

  const handleArchive = () => {
    setArchive((prev) => !prev)
  }

  const handleEdit = () => {
    changeEditingStatus(id)
    setTodo(text)
  }
  const handleConfirm = () => {
    confirmTodo(id, todo)
  }

  const handleCancel = () => {
    cancelTodo(id)
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
      {editing ? (
        <input type="text" value={todo} onChange={handleChange} />
      ) : (
        <div style={{ opacity: archive ? '0.3' : '' }}>{text}</div>
      )}

      {!archive && !editing && <button onClick={handleEdit}>edit</button>}

      {!editing && (
        <button onClick={handleArchive}>
          {!archive ? 'archive' : 'unarchive'}
        </button>
      )}

      {archive && <button onClick={handleDelete}>delete</button>}

      {editing && (
        <>
          <button onClick={handleConfirm}>confirm</button>
          <button onClick={handleCancel}>cancel</button>
        </>
      )}
    </div>
  )
}

export default TodoItem
