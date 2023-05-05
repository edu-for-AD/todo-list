import { useState } from 'react'

import TodoArchiveBtn from './TodoArchiveBtn'

function TodoItem({ id, text, deleteTodo, modifiedTodo }) {
  const [isArchive, setIsArchive] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [modifiedText, setModifiedText] = useState(text)

  // input 내용바뀌면 Todo.js로 바뀐 Text내용 전달
  const handleChange = (event) => {
    setModifiedText(event.target.value)
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div>
        {isArchive === true ? (
          <span style={{ opacity: 0.3 }}>{text}</span>
        ) : isEdit === true ? (
          <input type="text" value={modifiedText} onChange={handleChange} />
        ) : (
          <span>{text}</span>
        )}
      </div>

      {!isArchive &&
        (isEdit === false ? (
          <button
            onClick={() => {
              setIsEdit(!isEdit)
            }}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                modifiedTodo(id, text)
                setIsEdit(!isEdit)
              }}
            >
              confirm
            </button>
            <button
              onClick={() => {
                setIsEdit(!isEdit)
              }}
            >
              Cancel
            </button>
          </>
        ))}

      {!isEdit && (
        <TodoArchiveBtn
          id={id}
          isArchive={isArchive}
          setIsArchive={setIsArchive}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  )
}

export default TodoItem
