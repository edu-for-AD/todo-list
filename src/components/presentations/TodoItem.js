import { useState } from 'react'

function TodoItem({ id, text, deleteTodo, changeTodo }) {
  const [archive, setArchive] = useState(false)
  const [edit, setEdit] = useState(false)
  const [todo, setTodo] = useState(text)

  const handleOnClickArchive = () => {
    setArchive((current) => !current)
  }
  const handleOnClickEdit = () => {
    setEdit((current) => !current)
    setTodo(text)
  }
  const handleOnConfirm = () => {
    setEdit((current) => !current)
    changeTodo(id)
    console.log('confirm')
  }
  const handleChange = (event) => {
    setTodo(event.target.value)
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {!edit ? (
        <div style={{ opacity: archive ? '0.3' : '' }}>{text}</div>
      ) : (
        <input type="text" value={todo} onChange={handleChange} />
      )}

      {!archive && <button onClick={handleOnClickEdit}>edit</button>}

      <button onClick={handleOnClickArchive}>
        {!archive ? 'archive' : 'unarchive'}
      </button>

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
          <button onClick={handleOnConfirm}>confirm</button>
          <button onClick={handleOnClickEdit}>cancel</button>
        </>
      )}
    </div>
  )
}

export default TodoItem
