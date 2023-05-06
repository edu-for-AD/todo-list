import { useState } from 'react'

function TodoItem({
  id,
  text,
  deleteTodo,
  editing,
  changeEditingStatus,
  changeArchiveStatus,
  changeActivateStatus,
  cancelTodo,
  confirmTodo,
  archived,
  activated
}) {
  const [editingTodo, setEditingTodo] = useState('')

  const handleArchive = () => {
    changeArchiveStatus(id)
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

  const handleChangeActivate = () => {
    changeActivateStatus(id)
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
            checked={activated}
            onChange={handleChangeActivate}
          />
          <div
            style={{
              textDecoration: activated ? 'line-through' : '',
              opacity: archived ? '0.3' : ''
            }}
          >
            {text}
          </div>
        </>
      )}

      {!archived && !editing && <button onClick={handleEdit}>edit</button>}

      {!editing && (
        <button onClick={handleArchive}>
          {!archived ? 'archive' : 'unarchive'}
        </button>
      )}

      {archived && <button onClick={handleDelete}>delete</button>}

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
