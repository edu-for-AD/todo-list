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
  const [editingTodo, setEditingTodo] = useState('')
  const [archive, setArchive] = useState(false)

  const handleArchive = () => {
    setArchive((prev) => !prev)
  }

  const handleEdit = () => {
    changeEditingStatus(id)
    setEditingTodo(text)
  }
  const handleConfirm = () => {
    confirmTodo(id, editingTodo)
  }

  const handleCancel = () => {
    cancelTodo(id)
    setEditingTodo(text)
  }

  const handleDelete = () => {
    deleteTodo(id)
  }

  const handleChange = (event) => {
    setEditingTodo(event.target.value)
  }

  const handleKeyDown = (event) => {
    const key = event.code
    switch (key) {
      case 'Enter':
      case 'NumpadEnter':
        handleConfirm()
        break

      case 'Escape':
        handleCancel()
        break

      default:
    }
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {editing ? (
        <input
          type="text"
          value={editingTodo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
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
