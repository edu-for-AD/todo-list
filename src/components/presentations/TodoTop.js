import { useState } from 'react'
import { v1 as uuidv1 } from 'uuid'

function TodoTop({ addTodo, editTodo }) {
  const [todo, setTodo] = useState('')

  const handleChange = (event) => {
    setTodo(event.target.value)
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {editTodo === false ? (
        <input type="text" value={todo} onChange={handleChange} />
      ) : (
        <input type="text" value={todo} onChange={handleChange} disabled />
      )}

      <button
        onClick={() => {
          addTodo({ id: uuidv1(), text: todo, isEdit: false })
          setTodo('')
        }}
      >
        add
      </button>
    </div>
  )
}

export default TodoTop
