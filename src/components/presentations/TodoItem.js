import { useEffect, useState } from 'react'

function TodoItem({
  id,
  text,
  deleteTodo,
  archived,
  toggleArchiveStatus,
  editing,
  editTodo,
  updateEditingStatus
}) {
  const [editingText, setEditingText] = useState(text)
  const handleChange = (event) => {
    setEditingText(event.target.value)
  }

  useEffect(() => {
    if (!editing) {
      setEditingText(text)
    }
  }, [editing, text])

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {!editing && <div>{text}</div>}
      {editing && <input value={editingText} onChange={handleChange} />}

      {!archived && (
        <button
          onClick={() => {
            updateEditingStatus(id, !editing)

            if (editing) {
              editTodo(id, editingText)
            }
          }}
        >
          {editing ? 'confirm' : 'edit'}
        </button>
      )}
      {!archived && editing && (
        <button
          onClick={() => {
            updateEditingStatus(id, false)
          }}
        >
          cancel
        </button>
      )}
      {!editing && (
        <button
          onClick={() => {
            toggleArchiveStatus(id, editingText)
          }}
        >
          {archived ? 'unarchive' : 'archive'}
        </button>
      )}
      {!editing && archived && (
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
