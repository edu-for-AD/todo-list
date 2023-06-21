import { useEffect, useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'
import TodoFilter from '../presentations/TodoFilter'
import { useSearchParams } from 'react-router-dom'
import { useTodo } from '../containers/useTodo'

function Todo() {
  const {
    todos,
    addTodo,
    deleteTodo,
    changeEditingStatus,
    toggleArchiveStatus,
    toggleCompleteStatus,
    cancelTodo,
    confirmTodo
  } = useTodo()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterArchive, setFilterArchive] = useState('all')
  const [filterComplete, setFilterComplete] = useState('all')
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

  useEffect(() => {
    const archiveParams = searchParams.get('filterArchiveStatus')
    const completeParams = searchParams.get('filterCompleteStatus')
    if (
      archiveParams === null ||
      (archiveParams !== 'all' &&
        archiveParams !== 'archived' &&
        archiveParams !== 'unarchived')
    ) {
      setSearchParams({
        filterArchiveStatus: 'all',
        filterCompleteStatus: 'all'
      })
    } else {
      setFilterArchive(archiveParams)
    }

    if (
      completeParams === null ||
      (completeParams !== 'all' &&
        completeParams !== 'completed' &&
        completeParams !== 'uncompleted')
    ) {
      setSearchParams({
        filterArchiveStatus: 'all',
        filterCompleteStatus: 'all'
      })
    } else {
      setFilterComplete(completeParams)
    }
  }, [searchParams, setSearchParams])

  return (
    <div>
      <TodoTop addTodo={addTodo} editing={editing} />
      <TodoFilter
        filterArchive={filterArchive}
        setFilterArchive={setFilterArchive}
        filterComplete={filterComplete}
        setFilterComplete={setFilterComplete}
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
