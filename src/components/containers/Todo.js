import { useState  } from "react";
import TodoItem from "../presentations/TodoItem";
import TodoTop from "../presentations/TodoTop";

function Todo() {
  const [todos, setTodos] = useState([]);    
  const [isedit, setIsedit] = useState(false);    

 
  //글추가
  const addTodo = (todo) => {
    todo.isedit=false;
    todo.isarchive=false;
    setTodos([...todos, todo]);
  };
  
  //글삭제
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };


  //글수정
  const editTodo = (todo) =>{
    
    todos.map((prev)=>{
      if(prev.id===todo.id){
        prev.isedit=!prev.isedit;
        
        if(isedit){
          prev.text = todo.text;
        }
        setIsedit(!isedit);


        console.log('editTodo',todo);
        return;
      }
    })
  }


  //휴지통(아카이브)
  const archiveTodo = (id)=>{
 
  }

  

  return (
    <div>
      <TodoTop addTodo={addTodo} />
      {todos.map((todo) => (
        
        <TodoItem
          // key={todo.id}
          // id={todo.id}
          // text={todo.text}
          // isedit={todo.isedit}
          // isachive={todo.isachive}
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          archiveTodo={archiveTodo}
          deleteTodo={deleteTodo}
        />

      ))}
    </div>
  );
}

export default Todo;
