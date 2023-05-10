import { useState } from 'react'

function TodoItem({
  id,
  text,
  isEdit,
  isArchive,
  editTodo,
  changeTodo,
  deleteTodo,
  changeIsEdit,
  changeIsArchive
}) {
  const [editText, setEditText] = useState(text)

  const handleisEdit = () => {
    setEditText(text)
    changeIsEdit(id)
  }

  const handleisConfirm = () => {
    changeTodo(editText)
    changeIsEdit(id)
  }
  const handleCancel = () => {
    setEditText(text)
    changeIsEdit(id)
  }
  const handleisArchive = () => {
    changeIsArchive(id)
  }

  const handleTextChange = (event) => {
    setEditText(event.target.value)
  }
  const handleDelete = () => {
    deleteTodo(id)
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {!isArchive && !isEdit && (
        <>
          <div>{editText}</div>
          <button onClick={handleisEdit}>edit</button>
          <button onClick={handleisArchive}>archive</button>
        </>
      )}
      {!isArchive && isEdit && (
        <>
          <input type="text" value={editText} onChange={handleTextChange} />
          <button onClick={handleisConfirm}>confirm</button>
          <button onClick={handleCancel}>cancel</button>
        </>
      )}
      {isArchive && (
        <>
          <div style={{ opacity: 0.3 }}>{editText}</div>
          <button onClick={handleisArchive}>unarchive</button>
          <button onClick={handleDelete}>delete</button>
        </>
      )}
    </div>
  )
}

export default TodoItem
