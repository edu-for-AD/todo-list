import { TodoItem } from '../presentations/TodoItem'
import { TodoTop } from '../presentations/TodoTop'
import { TodoFilter } from '../presentations/TodoFilter'
import { useTodo } from '../containers/useTodo'
import { useTodoFilter } from '../containers/useTodoFilter'
import { Modal } from '../presentations/Modal'

export const Todo = () => {
  const {
    todos,
    addTodo,
    deleteTodo,
    changeEditingStatus,
    toggleArchiveStatus,
    toggleCompleteStatus,
    cancelTodo,
    confirmTodo,
    isOpen,
    confirmCallback,
    cancelCallback,
    modalData,
    openModal
  } = useTodo()
  const {
    filterArchive,
    filterComplete,
    editing,
    filterTodos,
    setFilterArchive,
    setFilterComplete,
    setSearchParams
  } = useTodoFilter(todos)

  return (
    <div>
      <TodoTop addTodo={addTodo} editing={editing} />
      <TodoFilter
        filterArchive={filterArchive}
        setFilterArchive={setFilterArchive}
        filterComplete={filterComplete}
        setFilterComplete={setFilterComplete}
        setSearchParams={setSearchParams}
      />

      {filterTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          confirmTodo={confirmTodo}
          deleteTodo={deleteTodo}
          editing={todo.editing}
          cancelTodo={cancelTodo}
          changeEditingStatus={changeEditingStatus}
          toggleArchiveStatus={toggleArchiveStatus}
          toggleCompleteStatus={toggleCompleteStatus}
          archived={todo.archived}
          completed={todo.completed}
          openModal={openModal}
        />
      ))}

      <Modal
        isOpen={isOpen}
        title={modalData?.title ?? ''}
        body={modalData?.body ?? ''}
        confirmCallback={confirmCallback}
        cancelCallback={cancelCallback}
      />
    </div>
  )
}
