import { useState } from 'react'

function TodoItem({
  archive,
  edit,
  handleArchive,
  handleEdit,
  handleConfirm,
  handleCancel,
  id,
  text,
  deleteTodo
}) {
  const [todo, setTodo] = useState('')

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
          <button onClick={handleCancel}>cancel</button>
        </>
      )}
    </div>
  )
}

export default TodoItem
