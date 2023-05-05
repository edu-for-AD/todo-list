import { useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'
import TodoFilter from '../presentations/TodoFilter'

function Todo() {
  const [todos, setTodos] = useState([])
  const editing = todos.some((todo) => todo.editing === true)
  const archiving = ''
  const activating = ''

  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const changeEditingStatus = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, editing: !todo.editing }
        }

        if (todo.editing === true) {
          return { ...todo, editing: false }
        }

        return todo
      })
    )
  }

  const changeArchivingStatus = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, archiving: !todo.archiving }
        }

        return todo
      })
    )
  }

  const changeActivatingStatus = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, activating: !todo.activating }
        }

        return todo
      })
    )
  }
  const cancelTodo = (id) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, editing: false } : todo))
    )
  }

  const confirmTodo = (id, textItem) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: textItem, editing: !todo.editing }
          : todo
      )
    )
  }

  return (
    <div>
      <TodoTop
        addTodo={addTodo}
        editing={editing}
        archiving={archiving}
        activating={activating}
      />
      <TodoFilter />
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
          changeArchivingStatus={changeArchivingStatus}
          changeActivatingStatus={changeActivatingStatus}
          archiving={todo.archiving}
          activating={todo.activating}
        />
      ))}
    </div>
  )
}

export default Todo
