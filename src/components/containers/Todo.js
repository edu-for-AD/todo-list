import { useState } from 'react'
import TodoFilter from '../presentations/TodoFilter'
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
  const toggleArchiveStatus = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, archived: !todo.archived } : todo
      )
    )
  }
  const editTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    )
  }
  const updateEditingStatus = (id, newStatus) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: newStatus }
        }

        // in case something is editing, we want to make sure that it's not anymore
        if (todo.isEditing) {
          return { ...todo, isEditing: false }
        }

        return todo
      })
    )
  }
  const updateActivateStatus = (id, newStatus) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, activated: newStatus } : todo
      )
    )
  }
  const [archivedFilter, setArchivedFilter] = useState('all')
  const [activatedFilter, setActivatedFilter] = useState('all')
  const isEditing = todos.some((todo) => todo.isEditing)
  const filteredTodos = todos
    .filter((todo) => {
      if (archivedFilter === 'archived') {
        return todo.archived
      }

      if (archivedFilter === 'unarchived') {
        return !todo.archived
      }

      return true
    })
    .filter((todo) => {
      if (activatedFilter === 'activated') {
        return todo.activated
      }

      if (activatedFilter === 'inactivated') {
        return !todo.activated
      }

      return true
    })

  return (
    <div>
      <TodoTop isEditing={isEditing} addTodo={addTodo} />
      <TodoFilter
        archivedFilter={archivedFilter}
        setArchivedFilter={setArchivedFilter}
        activatedFilter={activatedFilter}
        setActivatedFilter={setActivatedFilter}
      />
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          deleteTodo={deleteTodo}
          archived={todo.archived}
          toggleArchiveStatus={toggleArchiveStatus}
          isEditing={todo.isEditing}
          editTodo={editTodo}
          updateEditingStatus={updateEditingStatus}
          activated={todo.activated}
          updateActivateStatus={updateActivateStatus}
        />
      ))}
    </div>
  )
}

export default Todo
