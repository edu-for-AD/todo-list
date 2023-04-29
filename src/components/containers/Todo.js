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
  const changeTodo = () => {
    console.log('changeTodo function run')
  }

  return (
    <div>
      <TodoTop addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          changeTodo={changeTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  )
}

export default Todo
