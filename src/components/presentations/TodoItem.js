import { useState } from 'react'

function TodoItem({
  id,
  text,
  isEdit,
  isArchive,
  changeTodo,
  deleteTodo,
  changeIsEdit,
  changeIsArchive
}) {
  const [editText, setEditText] = useState(text)

  const handleisEdit = () => {
    changeIsEdit(id)
    changeTodo(id, editText)
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
          <button
            onClick={() => {
              handleisEdit()
            }}
          >
            confirm
          </button>
          <button onClick={handleisEdit}>cancel</button>
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
