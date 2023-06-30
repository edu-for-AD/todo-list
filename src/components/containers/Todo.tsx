import { TodoItem } from '../presentations/TodoItem'
import { TodoTop } from '../presentations/TodoTop'
import { TodoFilter } from '../presentations/TodoFilter'
import { useTodo } from '../containers/useTodo'
import { useTodoFilter } from '../containers/useTodoFilter'
import { Modal } from '../presentations/Modal'
import { FC } from 'react'

export const Todo: FC = () => {
  const {
    todos,
    addTodo,
    changeEditingStatus,
    toggleCompleteStatus,
    cancelTodo,
    confirmTodo,
    confirmModalCallback,
    cancelModalCallback,

    editing,
    modalData,
    openModal,
    isModalOpen
  } = useTodo()
  const {
    filterArchive,
    filterComplete,
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
          editing={todo.editing}
          cancelTodo={cancelTodo}
          changeEditingStatus={changeEditingStatus}
          toggleCompleteStatus={toggleCompleteStatus}
          archived={todo.archived}
          completed={todo.completed}
          openModal={openModal}
        />
      ))}

      {modalData && (
        <Modal
          isOpen={isModalOpen}
          title={modalData.title}
          body={
            editing ? (
              <>
                <p>{modalData.body}</p>
                <label>
                  title
                  <input type="text" />
                </label>

                <label>
                  description
                  <input type="text" />
                </label>
              </>
            ) : (
              <p>{modalData.body}</p>
            )
          }
          confirmModalCallback={confirmModalCallback}
          cancelModalCallback={cancelModalCallback}
        />
      )}
    </div>
  )
}
