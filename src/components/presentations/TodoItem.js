import { useState } from 'react'
import { v1 as uuidv1 } from 'uuid'

function TodoItem({ id, text, changeTodo, deleteTodo }) {
  const [todo, setTodo] = useState('')

  const [archive, setArchive] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleArchive = () => {
    setArchive((prev) => !prev)
  }
  const handleEdit = () => {
    setEdit((prev) => !prev)
  }
  const handleConfirm = () => {
    changeTodo({ id: uuidv1(), text: todo })
    setTodo('')
  }

  const handleCancel = () => {
    setEdit((prev) => !prev)
  }

  const handleDelete = () => {
    deleteTodo(id)
  }
  const handleChange = () => {}
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

      {archive && <button onClick={handleDelete}>delete</button>}

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
