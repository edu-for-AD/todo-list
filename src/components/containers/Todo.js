import { useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'

function Todo() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const toggleArchiveStatus = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, archived: !todo.archived } : todo
      )
    )
  }
  const editTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    )
  }
  const updateEditingStatus = (id, newStatus) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, editing: newStatus }
        }

        // in case something is editing, we want to make sure that it's not anymore
        if (todo.editing) {
          return { ...todo, editing: false }
        }

        return todo
      })
    )
  }
  const isEditing = todos.some((todo) => todo.editing)

  return (
    <div>
      <TodoTop isEditing={isEditing} addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          deleteTodo={deleteTodo}
          archived={todo.archived}
          toggleArchiveStatus={toggleArchiveStatus}
          editing={todo.editing}
          editTodo={editTodo}
          updateEditingStatus={updateEditingStatus}
        />
      ))}
    </div>
  )
}

export default Todo
