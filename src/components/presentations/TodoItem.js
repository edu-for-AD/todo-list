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
      <div
        style={
          archive
            ? { opacity: '0.3' }
            : null || edit
            ? { display: 'none' }
            : null
        }
      >
        {text}
      </div>

      <input
        type="text"
        value={todo}
        style={edit ? null : { display: 'none' }}
        onChange={handleChange}
      />

      <button
        style={archive ? null : { display: 'none' }}
        onClick={handleOnClickArchive}
      >
        unarchive
      </button>

      <button
        style={archive ? null : { display: 'none' }}
        onClick={() => {
          deleteTodo(id)
        }}
      >
        delete
      </button>
      <button
        style={archive || edit ? { display: 'none' } : null}
        onClick={handleOnClickEdit}
      >
        edit
      </button>
      <button
        style={edit ? null : { display: 'none' }}
        onClick={handleOnConfirm}
      >
        confirm
      </button>
      <button
        style={edit ? null : { display: 'none' }}
        onClick={handleOnClickEdit}
      >
        cancel
      </button>

      <button
        style={archive || edit ? { display: 'none' } : null}
        onClick={handleOnClickArchive}
      >
        archive
      </button>
    </div>
  )
}

export default TodoItem
