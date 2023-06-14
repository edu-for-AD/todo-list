import { useEffect, useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'
import TodoFilter from '../presentations/TodoFilter'
import { useSearchParams } from 'react-router-dom'

function Todo() {
  const [todos, setTodos] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()

  const [filterArchive, setFilterArchive] = useState('all')

  // searchParams.get('filterArchiveStatus')
  const [filterComplete, setFilterComplete] = useState('all')
  // searchParams.get('filterCompleteStatus')

  const editing = todos.some((todo) => todo.editing === true)

  const filterTodos = todos
    .filter((todo) => {
      if (filterArchive === 'archived') {
        return todo.archived
      }

      if (filterArchive === 'unarchived') {
        return !todo.archived
      }
      return todos
    })
    .filter((todo) => {
      if (filterComplete === 'completed') {
        return todo.completed
      }

      if (filterComplete === 'uncompleted') {
        return !todo.completed
      }
      return todos
    })

  const addTodo = (todo) => {
    fetch(`http://localhost:8080/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: todo.text })
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos([...todos, result])
      })
  }

  const deleteTodo = (id) => {
    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
      })
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

  const toggleArchiveStatus = (id, archived) => {
    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ archived: !archived })
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo.id === id) {
              return updatedTodo
            }

            return todo
          })
        )
      })
  }

  const toggleCompleteStatus = (id, completed) => {
    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !completed })
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo.id === id) {
              return updatedTodo
            }

            return todo
          })
        )
      })
  }
  const cancelTodo = (id) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, editing: false } : todo))
    )
  }

  const confirmTodo = (id, textItem) => {
    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: textItem })
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, title: textItem, editing: !todo.editing }
              : todo
          )
        )
      })
  }
  useEffect(() => {
    const getArchiveParams = searchParams.get('filterArchiveStatus')
    const getCompleteParams = searchParams.get('filterCompleteStatus')
    // eslint-disable-next-line no-console
    console.log('what ' + getArchiveParams, getCompleteParams)

    if (getArchiveParams === null) {
      // eslint-disable-next-line no-console
      console.log('not exist !')
      // setFilterArchive('all')
      // setFilterComplete('all')
      setSearchParams({
        filterArchiveStatus: 'all',
        filterCompleteStatus: 'all'
      })
    } else if (
      getArchiveParams !== 'all' &&
      getArchiveParams !== 'archived' &&
      getArchiveParams !== 'unarchived'
    ) {
      // eslint-disable-next-line no-console
      console.log('invalid !')
      setSearchParams({
        filterArchiveStatus: 'all',
        filterCompleteStatus: 'all'
      })
      setFilterArchive(getArchiveParams)
      setFilterComplete(getCompleteParams)
    } else {
      // eslint-disable-next-line no-console
      console.log('valid !')
    }

    fetch(`http://localhost:8080/api/todos`)
      .then((response) => response.json())
      .then((result) => {
        setTodos(result)
      })
  }, [])

  return (
    <div>
      <TodoTop addTodo={addTodo} editing={editing} />
      <TodoFilter
        filterArchive={filterArchive}
        setFilterArchive={setFilterArchive}
        filterComplete={filterComplete}
        setFilterComplete={setFilterComplete}
        // query={query}
        // setQuery={setQuery}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {filterTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.title}
          confirmTodo={confirmTodo}
          deleteTodo={deleteTodo}
          editing={todo.editing}
          cancelTodo={cancelTodo}
          changeEditingStatus={changeEditingStatus}
          toggleArchiveStatus={toggleArchiveStatus}
          toggleCompleteStatus={toggleCompleteStatus}
          archived={todo.archived}
          completed={todo.completed}
        />
      ))}
    </div>
  )
}

export default Todo
