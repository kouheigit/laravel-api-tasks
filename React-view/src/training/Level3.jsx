import React,{　useState　} from 'react';
function Level3(){

    const[todos,setTodos] = useState([]);
    const[inputs,setInputs] = useState('');
    const[filter,setFilter] = useState('all');

    const addTodo = () =>{
        if(input.trim()==='')retrun;
        setTodos([...todos,{text:input,completed:false}]);
        setInputs('');
    }
    const toggleComplete = (index) => {
        const newTodos = [...todos];
    }
    /*
     const toggleComplete = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };
     */
    return (
        <div>

            <input type ="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
            <button onClick={addTodo}>追加</button>
        </div>
    );
}
