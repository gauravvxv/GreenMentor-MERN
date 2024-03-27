import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import { useState } from 'react';
import styles from "../styles/popup.module.css"
import { addTasks } from '../store/actions/taskActions';
const Popup = ({handleClose}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ title: '', description: '' });
  
    const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = () => {
      dispatch(addTasks(formData));
      handleClose();
    };
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={handleClose}>&times;</span>
        <input type="text" className={styles.popInp} name="title" value={formData.title} onChange={handleChange} placeholder="Task Title" />
        <input type='text' className={styles.popInp} name="description" value={formData.description} onChange={handleChange} placeholder="Task Description" />
        <button  className ={styles.addBtn}onClick={handleSubmit}>Add Task</button>
      </div>
    </div>
  )
}

export default Popup
