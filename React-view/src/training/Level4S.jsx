import React, { useState } from 'react';
function Level4S(){
    const [count,setCount] = useState(0);
    const[history,sethistory] =useState([]);

    const increment = () =>{
        setCount(count + 1);
        setHistory([...history,`+1:${count} →${count} + 1`]);
    }
    const decrement = () =>{
        setCount(count - 1);
        setHistory([...history,`+1:${count}→${count} - 1`]);
    }
    const reset = () =>{
        setCount(0);
        setHistory([...history,`リセット:${count}→ 0`]);
    }

    const clearHistory = () =>{
        setHistory([]);
    }
    return(
        <div>
            <p>現在の値${count}</p>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick>{reset}リセット</button>
            <button onClick>{clearHistory}履歴をクリア</button>
            <ul>
                {history.map((item,index)=>(
                    <li key={index}></li>
                ))}
            </ul>
        </div>
    );
}
