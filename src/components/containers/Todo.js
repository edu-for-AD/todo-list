import { useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'
import TodoFilter from '../presentations/TodoFilter'

function Todo() {
  const [todos, setTodos] = useState([])
  const [filterArchive, setFilterArchive] = useState('All')
  const [filterActivate, setFilterActivate] = useState('All')

  const archiving = '' // using array.filter
  const editing = todos.some((todo) => todo.editing === true)
  const activating = '' // using array.filter

  // eslint-disable-next-line no-console
  console.log(todos)

  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const setArchivingStatus = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, archiving: !todo.archiving }
        }

        return todo
      })
    )
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

  const handleChangeArchive = (event) => {
    setFilterArchive(event.target.value)
  }
  const handleChangeActivate = (event) => {
    setFilterActivate(event.target.value)
  }

  return (
    <div>
      <TodoTop addTodo={addTodo} archiving={archiving} editing={editing} />
      <TodoFilter
        filterArchive={filterArchive}
        setFilterArchive={setFilterArchive}
        filterActivate={filterActivate}
        setFilterActivate={setFilterActivate}
        handleChangeArchive={handleChangeArchive}
        handleChangeActivate={handleChangeActivate}
      />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          confirmTodo={confirmTodo}
          deleteTodo={deleteTodo}
          archiving={todo.archiving}
          editing={todo.editing}
          cancelTodo={cancelTodo}
          setArchivingStatus={setArchivingStatus}
          changeEditingStatus={changeEditingStatus}
        />
      ))}
    </div>
  )
}

export default Todo
