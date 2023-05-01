import { useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'

function Todo() {
  const [todos, setTodos] = useState([])
  const editing = todos.some((todo) => todo.editing === true)
  console.log(todos)

  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const changeEditingStatus = (id) => {
    setTodos(todos.map((todo) => (todo.editing = false)))
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, editing: true } : todo))
    )
  }

  const cancelTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, editing: false } : todo))
    )
  }

  const confirmTodo = (id, textItem) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: textItem, editing: !todo.editing }
          : todo
      )
    )
  }

  return (
    <div>
      <TodoTop addTodo={addTodo} editing={editing} />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          confirmTodo={confirmTodo}
          deleteTodo={deleteTodo}
          editing={todo.editing}
          cancelTodo={cancelTodo}
          changeEditingStatus={changeEditingStatus}
        />
      ))}
    </div>
  )
}

export default Todo
