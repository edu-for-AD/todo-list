import { useState } from 'react'
// import { v1 as uuidv1 } from 'uuid'

function TodoItem({
  id,
  text,
  deleteTodo,
  editState,
  editStateCheck,
  cancelCheck,
  test
}) {
  const [todo, setTodo] = useState('')
  const [archive, setArchive] = useState(false)

  const handleArchive = () => {
    setArchive((prev) => !prev)
  }

  const handleEdit = () => {
    editStateCheck(id)
    setTodo(text)
  }
  const handleConfirm = () => {}

  const handleCancel = () => {
    cancelCheck(id)
  }

  const handleDelete = () => {
    deleteTodo(id)
  }
  const handleChange = (event) => {
    setTodo(event.target.value)
  }
  const onClick = () => {
    test()
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
      <button onClick={onClick}>test</button>
    </div>
  )
}

export default TodoItem
