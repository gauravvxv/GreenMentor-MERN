import React from 'react'
import Navbar from './Navbar'
import { useEffect,useState } from 'react'
import AddTask from './AddTask'
import {useSelector,useDispatch} from "react-redux"
import { getTasks,addTasks,updateTask,deleteTask } from '../store/actions/taskActions'
import UpdateForm from './UpdateForm'
import styles from "../styles/home.module.css"
const Home = () => {
  const dispatch = useDispatch();
  const token = useSelector(state=>state.auth.token);
  const tasks = useSelector(state=>state.tasks.tasks);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(()=>{
    dispatch(getTasks(token))
  },[dispatch,token])



  const handleUpdate = (task) => {
    setSelectedTask(task);
    setShowUpdateForm(true);
  }

  


  const handleDelete = (id) => {
    dispatch(deleteTask(id, token));
  };

 

  return (
    <div>
      <div className='navbar'>
<Navbar/>
      </div>

 <AddTask/>

      <div className={styles.taskContainer}>
<div className={styles.tasks}>
        {tasks.map(task => (
          <div key={task._id}  className={styles.allTasks}>
            <h3 className={styles.title}>Title : {task.title}</h3>
            <p className={styles.description}>Description : {task.description}</p>
            <div className={styles.buttonContainer}>
            <button onClick={() => handleUpdate(task)} className={styles.btnn}>
                  Update
                </button>
            <button onClick={() => handleDelete(task._id)} className={styles.btnn} >Delete</button>
            <select className={styles.btnn}>
              <option value="">priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
              </div>
          </div>
        ))}
   
</div>
      </div>
      {showUpdateForm && <UpdateForm task={selectedTask} setShowUpdateForm={setShowUpdateForm} />}
    </div>
  )
}

export default Home
