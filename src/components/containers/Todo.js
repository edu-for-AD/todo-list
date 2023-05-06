import { useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'
import TodoFilter from '../presentations/TodoFilter'

function Todo() {
  const [todos, setTodos] = useState([])

  const [filterArchive, setFilterArchive] = useState('All')
  const [filterActivate, setFilterActivate] = useState('All')

  const editing = todos.some((todo) => todo.editing === true)

  let filterTodos = todos

  if (filterArchive === 'All' || filterActivate === 'All') {
    filterTodos = todos
  }
  if (filterArchive === 'Archived') {
    filterTodos = todos.filter((todo) => todo.archived === true)
  }
  if (filterArchive === 'Unarchived') {
    filterTodos = todos.filter((todo) => todo.archived === false)
  }

  if (filterActivate === 'Activated') {
    filterTodos = todos.filter((todo) => todo.activated === true)
  }
  if (filterActivate === 'Inactivated') {
    filterTodos = todos.filter((todo) => todo.activated === false)
  }

  const addTodo = (todo) => {
    setTodos([...todos, todo])
    // setFilterTodos(todos)
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

  const changeArchiveStatus = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, archived: !todo.archived }
        }

        return todo
      })
    )
  }

  const changeActivateStatus = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, activated: !todo.activated }
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
      <TodoTop addTodo={addTodo} editing={editing} />
      <TodoFilter
        filterArchive={filterArchive}
        setFilterArchive={setFilterArchive}
        filterActivate={filterActivate}
        setFilterActivate={setFilterActivate}
      />

      {filterTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          confirmTodo={confirmTodo}
          deleteTodo={deleteTodo}
          editing={todo.editing}
          cancelTodo={cancelTodo}
          changeEditingStatus={changeEditingStatus}
          changeArchiveStatus={changeArchiveStatus}
          changeActivateStatus={changeActivateStatus}
          archived={todo.archived}
          activated={todo.activated}
        />
      ))}
    </div>
  )
}

export default Todo
