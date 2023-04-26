import { useEffect, useState } from 'react'

function TodoItem({
  id,
  text,
  deleteTodo,
  archived,
  toggleArchiveStatus,
  isEditing,
  editTodo,
  updateEditingStatus
}) {
  const [editingText, setEditingText] = useState(text)
  const handleChange = (event) => {
    setEditingText(event.target.value)
  }

  useEffect(() => {
    if (!isEditing) {
      setEditingText(text)
    }
  }, [isEditing, text])

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {!isEditing && (
        <div style={{ opacity: archived ? '0.3' : '' }}>{text}</div>
      )}
      {isEditing && <input value={editingText} onChange={handleChange} />}

      {!archived && (
        <button
          onClick={() => {
            updateEditingStatus(id, !isEditing)

            if (isEditing) {
              editTodo(id, editingText)
            }
          }}
        >
          {isEditing ? 'confirm' : 'edit'}
        </button>
      )}
      {!archived && isEditing && (
        <button
          onClick={() => {
            updateEditingStatus(id, false)
          }}
        >
          cancel
        </button>
      )}
      {!isEditing && (
        <button
          onClick={() => {
            toggleArchiveStatus(id, editingText)
          }}
        >
          {archived ? 'unarchive' : 'archive'}
        </button>
      )}
      {!isEditing && archived && (
        <button
          onClick={() => {
            deleteTodo(id)
          }}
        >
          delete
        </button>
      )}
    </div>
  )
}

export default TodoItem
