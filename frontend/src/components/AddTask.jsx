import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addTasks } from '../store/actions/taskActions';
import styles from "../styles/add.module.css"
import { useState } from 'react';
import Popup from './Popup';
const AddTask = () => {
    const dispatch = useDispatch();
    const token = useSelector(state=>state.auth.token);
    const [showModal, setShowModal] = useState(false);
    

    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  

    
    const handleAddTask = () => {
        const formData ={
            title: "",
            description: ""
        }
        dispatch(addTasks(formData,token))
        setShowModal(true);
      }
  return (
    <div>
           <div className={styles.addButton}>
  <button onClick={handleAddTask}>Add Task</button>
      </div>
      {showModal && <Popup handleClose={handleCloseModal} />}
    </div>
  )
}

export default AddTask
