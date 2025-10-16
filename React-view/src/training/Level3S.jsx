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
            <inoput type="text" value={input} onChange{(e)=>setInputs(e.target.value)}/>
            <button onClick={addTodo}>追加</button>


        </div>
    );
}
export default Level3S;
