import { useEffect, useState } from 'react'

function TodoItem({
  id,
  text,
  deleteTodo,
  archived,
  toggleArchiveStatus,
  isEditing,
  editTodo,
  updateEditingStatus,
  activated,
  updateActivateStatus
}) {
  const [editingText, setEditingText] = useState(text)
  const handleChange = (event) => {
    setEditingText(event.target.value)
  }
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter': {
        updateEditingStatus(id, !isEditing)

        editTodo(id, editingText)

        break
      }

      case 'Escape': {
        updateEditingStatus(id, false)

        break
      }

      default: {
        break
      }
    }
  }
  const handleSelectCheckbox = (event) => {
    updateActivateStatus(id, !event.target.checked)
  }

  useEffect(() => {
    if (!isEditing) {
      setEditingText(text)
    }
  }, [isEditing, text])

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <input
        type="checkbox"
        checked={!activated}
        onChange={handleSelectCheckbox}
      />
      {!isEditing && (
        <div
          style={{
            opacity: archived ? '0.3' : '',
            textDecoration: !activated ? 'line-through' : ''
          }}
        >
          {text}
        </div>
      )}
      {isEditing && (
        <input
          value={editingText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      )}

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
