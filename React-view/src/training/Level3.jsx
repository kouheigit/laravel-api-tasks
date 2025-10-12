import React, { useState } from 'react';

function Level3(){

    const[todos,setTodos] = useState([]);
    const[input,setInput] = useState('');
    const[filter,setFilter] = useState('all');

    const addTodo = () =>{
        if(input.trim()==='') return;
        setTodos([...todos,{text:input,completed:false}]);
        setInput('');
    }
    const toggleComplete = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
     }
     /*
       const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };
      */
    const deleteTodo =(index) =>{
        setTodos(todos.filter((_,i)=>i!==index));
    }
    /*
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });*/
    const filteredTodos = todos.filter(todo=>{
        if(filter ==='active') return!todo.completed;
        if(filter ==='completed')return todo.completed;
        return true;
    });


    return (
        <div>
            <input type ="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
            <button onClick={addTodo}>追加</button>
            <ul>
                {filteredTodos.map((todo, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todos.indexOf(todo))}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todos.indexOf(todo))}>削除</button>
                    </li>
                ))}
            </ul>
            <ul>
                {todos.map((todo,index)=>(
                    <li key={index}>
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Level3;
