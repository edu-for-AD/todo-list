import { useState } from 'react'

function TodoItem({
  id,
  text,
  deleteTodo,
  archiving,
  editing,
  setArchivingStatus,
  changeEditingStatus,
  cancelTodo,
  confirmTodo
}) {
  const [editingTodo, setEditingTodo] = useState('')
  const [inActive, setInActive] = useState(false)

  const handleArchive = () => {
    setArchivingStatus(id)
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

  const handleChangeCheckBox = () => {
    setInActive((prev) => !prev)
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
            checked={inActive}
            onChange={handleChangeCheckBox}
          />
          <div
            style={{
              textDecoration: inActive ? 'line-through' : '',
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
