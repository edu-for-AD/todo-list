import { useState } from 'react'
import { v1 as uuidv1 } from 'uuid'

function TodoTop({ addTodo, editState }) {
  const [todo, setTodo] = useState('')
  const handleChange = (event) => {
    setTodo(event.target.value)
  }

  console.log('Top : ' + editState)

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {editState ? (
        <>
          <input type="text" value={todo} onChange={handleChange} disabled />
          <button
            disabled
            onClick={() => {
              addTodo({ id: uuidv1(), text: todo, editState: false })
              setTodo('')
            }}
          >
            add
          </button>
        </>
      ) : (
        <>
          <input type="text" value={todo} onChange={handleChange} />
          <button
            onClick={() => {
              addTodo({ id: uuidv1(), text: todo, editState: false })
              setTodo('')
            }}
          >
            add
          </button>
        </>
      )}
    </div>
  )
}

export default TodoTop
