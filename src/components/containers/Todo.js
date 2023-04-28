import { useState } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'

function Todo() {
  const [todos, setTodos] = useState([])
  const [archive, setArchive] = useState(false)
  const [edit, setEdit] = useState(false)
  const handleArchive = () => {
    setArchive((prev) => !prev)
  }
  const handleEdit = () => {
    setEdit((prev) => !prev)
  }
  const handleConfirm = () => {
    setEdit((prev) => !prev)
  }
  const handleCancel = () => {
    setEdit((prev) => !prev)
  }
  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    console.log('delete')
  }

  return (
    <div>
      <TodoTop addTodo={addTodo} edit={edit} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // why need key? is it necessary?
          id={todo.id}
          text={todo.text}
          deleteTodo={deleteTodo}
          archive={archive}
          edit={edit}
          handleArchive={handleArchive}
          handleEdit={handleEdit}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        />
      ))}
    </div>
  )
}

export default Todo
