import { useState, useEffect } from 'react'
import TodoItem from '../presentations/TodoItem'
import TodoTop from '../presentations/TodoTop'

function Todo() {
  //전체 Todo를 저장하는 배열 
  const [todos, setTodos] = useState([]);

 
  //TodoTop  
  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }
  //TodoItem
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  //TodoItem
  const modifiedTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: text } // 해당 id의 todo를 복사하고, text 값을 변경하여 반환
          : todo // id가 일치하지 않으면 그대로 반환
      )
    );
  };



  return (
    <div>
      <TodoTop addTodo={addTodo} />
      {todos.map((todo) => (

 
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            deleteTodo={deleteTodo}
            modifiedTodo={modifiedTodo}
          />
 
      ))}
    </div>
  )
}

export default Todo