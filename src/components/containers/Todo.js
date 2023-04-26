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
    console.log('delete')
  }
  const changeTodo = (id) => {
    console.log('changeTodo')
    todos.map((todo) => (todo.id === id ? console.log(todo.text) : null))
  }

  return (
    <div>
      <TodoTop addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // why need key? is it necessary?
          id={todo.id}
          text={todo.text}
          deleteTodo={deleteTodo}
          changeTodo={changeTodo}
        />
      ))}
    </div>
  )
}

export default Todo
