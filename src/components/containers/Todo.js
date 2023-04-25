import { useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'

function Todo() {
  const [todos, setTodos] = useState([])
  const [edit, setEdit] = useState()
  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const editStateCheck = (id) => {
    setTodos(todos.map((todo) => (todo.editState = false)))

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, editState: !todo.editState } : todo
      )
    )

    setEdit(true)
  }

  const cancelCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, editState: !todo.editState } : todo
      )
    )

    setEdit(false)
  }

  const changeTodo = (id, textItem) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: textItem, editState: !todo.editState }
          : todo
      )
    )
    setEdit(false)
  }
  console.log(todos)
  return (
    <div>
      <TodoTop addTodo={addTodo} edit={edit} setEdit={setEdit} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          changeTodo={changeTodo}
          deleteTodo={deleteTodo}
          edit={edit}
          setEdit={setEdit}
          editState={todo.editState}
          editStateCheck={editStateCheck}
          cancelCheck={cancelCheck}
        />
      ))}
    </div>
  )
}

export default Todo
