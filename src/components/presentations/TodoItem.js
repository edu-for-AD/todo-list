import { useState } from 'react'

function TodoItem({
  id,
  text,
  deleteTodo,
  editing,
  changeEditingStatus,
  changeArchivingStatus,
  changeActivatingStatus,
  cancelTodo,
  confirmTodo,
  archiving,
  activating
}) {
  const [editingTodo, setEditingTodo] = useState('')

  const handleArchive = () => {
    changeArchivingStatus(id)
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

  const handleChangeActivating = () => {
    changeActivatingStatus(id)
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
        <>
          <input
            type="checkbox"
            checked={activating}
            onChange={handleChangeActivating}
          />
          <div
            style={{
              textDecoration: activating ? 'line-through' : '',
              opacity: archiving ? '0.3' : ''
            }}
          >
            {text}
          </div>
        </>
      )}

      {!archiving && !editing && <button onClick={handleEdit}>edit</button>}

      {!editing && (
        <button onClick={handleArchive}>
          {!archiving ? 'archive' : 'unarchive'}
        </button>
      )}

      {archiving && <button onClick={handleDelete}>delete</button>}

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
