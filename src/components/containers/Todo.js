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
  const editStateCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, editState: !todo.editState } : todo
      )
    )
  }

  const cancelCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, editState: !todo.editState } : todo
      )
    )
  }

  const changeTodo = (id, textItem) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: textItem, editState: !todo.editState }
          : todo
      )
    )
  }
  let editState = todos.map((todo) => todo.editState)

  console.log(
    'Todo(Container) .map()todos.editState: ' +
      todos.map((todo) => todo.editState)
  )
  console.log('Todo(Container) editState: ' + editState)

  return (
    <div>
      {/* {todos.map((todo) => (
        <TodoTop addTodo={addTodo} editState={todo.editState} />
      ))} */}
      <TodoTop addTodo={addTodo} editState={editState} />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          changeTodo={changeTodo}
          deleteTodo={deleteTodo}
          editState={todo.editState}
          editStateCheck={editStateCheck}
          cancelCheck={cancelCheck}
        />
      ))}
    </div>
  )
}

export default Todo
