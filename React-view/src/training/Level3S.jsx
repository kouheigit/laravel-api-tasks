import React,{ useState } from 'react';

function Level3S(){
    const[todos,setTodos] = useState([]);
    const[inputs,setInputs] = useState('');
    const[filters,setFilter] = useState('all');

    const addTodo = () =>{
        if(inputs.trim==='')return;
        setTodos([...todos,{text:inputs,completed:false}]);
        setInputs('');

    }
    const toggleComplete = () =>{
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    const deleteTodo = () =>{
        if(filter ==='active') return!todo.completed;
        if(filter ==='completed') return todo.completed;
        return true;
    }

    return view(
        <div>
            <input type="text" value={input} onChange{(e)=>setInputs(e.target.value)}/>
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
        </div>
    );
}
export default Level3S;
