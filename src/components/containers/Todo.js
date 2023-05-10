import { useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'

function Todo() {
  const [todos, setTodos] = useState([])

  const IsEditing = todos.some((todo) => todo.isEdit === true)
  const editTodo = todos.find((todo) => todo.isEdit === true)

  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const changeIsArchive = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isArchive: !todo.isArchive }
        }
        if (todo.isEdit === true) {
          return { ...todo, isArchive: false }
        }
        return todo
      })
    )
  }
  const changeIsEdit = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEdit: !todo.isEdit }
        }
        if (todo.isEdit === true) {
          return { ...todo, isEdit: false }
        }
        return todo
      })
    )
  }

  const changeTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: text } : todo))
    )
  }

  return (
    <div>
      <TodoTop addTodo={addTodo} IsEditing={IsEditing} />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          isEdit={todo.isEdit}
          isArchive={todo.isArchive}
          editTodo={editTodo}
          changeTodo={changeTodo}
          deleteTodo={deleteTodo}
          changeIsEdit={changeIsEdit}
          changeIsArchive={changeIsArchive}
        />
      ))}
    </div>
  )
}

export default Todo
