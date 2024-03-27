import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/actions/taskActions';
import styles from "../styles/updateForm.module.css"
const UpdateForm = ({ task, setShowUpdateForm }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(task._id, formData));
    setShowUpdateForm(false);
  };

  const handleClose = () => {
    setShowUpdateForm(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={handleClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.popInp}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
          />
          <input
            type="text"
            className={styles.popInp}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
          />
          <button type="submit" className={styles.addBtn}>Update Task</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
