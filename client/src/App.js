import React, {useEffect, useState} from 'react';
import axios from 'axios';

const App = () => {
    const [item,setItem] = useState([]);
    const [task,setTask] = useState('');

    const changeHandler = e => {
        setTask(e.target.value);
    }

    const deleteHandler = id => {
        axios.delete(`https://task24app.herokuapp.com/delete/${id}`).then(
            arr => setItem(arr.data)
        )
    }

    const submitHandler = e => {
        
        e.preventDefault();
        axios.post('https://task24app.herokuapp.com/addtask',{todo:task}).then(
            arr => setItem(arr.data) 
        )
        setTask('');

    }

    useEffect(()=>{
        axios.get('https://task24app.herokuapp.com/gettask').then(
            response => setItem(response.data)
        )
    },[])
    return (
        <div className="body">
        <div>
        <center><h2>To Do List</h2></center>

        </div>
        <div className="content">
        <center className="main">
             <form onSubmit={submitHandler}>
                 <input type="text" name="task" className="inputTask" onChange={changeHandler} value={task} placeholder="Enter the task" /><br />
                 <input type="submit" value="Add" className="input_btn"/> <br />
             </form>
             {
                 console.log(item)}
                 {item.map(task => 
                 <div className="task_block" key={task._id}>
                     <span className="task">{task.todo}</span> <button className="delete_btn"onClick={()=>deleteHandler(task._id)}>x</button>
                 </div>
                 )}

             </center>
        </div>

        </div>
    )
}

export default App;