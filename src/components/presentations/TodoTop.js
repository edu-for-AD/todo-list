import { useState } from 'react'
import { v1 as uuidv1 } from 'uuid'

function TodoTop({ isEditing, addTodo }) {
  const [todo, setTodo] = useState('')
  const handleChange = (event) => {
    setTodo(event.target.value)
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <input
        type="text"
        value={todo}
        disabled={isEditing}
        onChange={handleChange}
      />

      <button
        disabled={isEditing}
        onClick={() => {
          addTodo({
            id: uuidv1(),
            text: todo,
            archived: false,
            isEditing: false
          })
          setTodo('')
        }}
      >
        add
      </button>
    </div>
  )
}

export default TodoTop
