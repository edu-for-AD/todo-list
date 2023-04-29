import { useState } from 'react'
// import { v1 as uuidv1 } from 'uuid'

function TodoItem({ id, text, deleteTodo, editState, editStateCheck }) {
  const [todo, setTodo] = useState('')
  const [archive, setArchive] = useState(false)
  // const [edit, setEdit] = useState(false)

  const handleArchive = () => {
    setArchive((prev) => !prev)
  }

  const handleEdit = () => {
    editStateCheck(id)
    setTodo(text)
  }
  const handleConfirm = () => {}

  const handleCancel = () => {
    editStateCheck(id)
  }

  const handleDelete = () => {
    deleteTodo(id)
  }
  const handleChange = (event) => {
    setTodo(event.target.value)

    console.log('handleChange')
  }
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {editState ? (
        <input type="text" value={todo} onChange={handleChange} /> // edit
      ) : (
        <div style={{ opacity: archive ? '0.3' : '' }}>{text}</div> // unedit
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
