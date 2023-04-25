import { useState, useEffect } from 'react'

function TodoItem({ todo, editTodo, archiveTodo, deleteTodo }) {
  const [editTodoText, setEditTodoText] = useState(todo.text) //Edit  - 추가

  useEffect(() => {
    todo.text = editTodoText
  }, [editTodoText])

  const InputchangHandle = (e) => {
    //Edit  - 추가
    setEditTodoText(e.target.value)
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div>
        {/* //Edit  - 추가 */}
        {!todo.isedit ? (
          <span>{todo.text}</span>
        ) : (
          <input value={editTodoText} onChange={InputchangHandle} />
        )}
      </div>

      {/* edit 버튼 */}
      <button
        onClick={() => {
          editTodo(todo)
        }}
      >
        edit
      </button>

      {/* 아카이브 버튼 */}
      <button onClick={{}}>archive</button>

      {/* <button
        onClick={() => {
          deleteTodo(id)
        }}
      >
        delete
      </button> */}
    </div>
  )
}

export default TodoItem
