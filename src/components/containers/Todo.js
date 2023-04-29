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
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, editState: !todo.editState } : todo
      )
    )

    setEdit((setEdit) => !setEdit)
    console.log(todos)
  }

  const changeTodo = () => {
    console.log('changeTodo function run')
  }

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
        />
      ))}
    </div>
  )
}

export default Todo
