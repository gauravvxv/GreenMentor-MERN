import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import styles from "../styles/profile.module.css"

const Profile = () => {
  const [show,setShow] = useState({});
const navigate = useNavigate();
const [profileData, setProfileData] = useState({})
const [editData, setEditData] = useState(null);

const userID = localStorage.getItem('userID');
console.log(userID);
const showData = async () => {
  try {
    const api = await axios.get(`https://backend-mern-crud.onrender.com/profile?id=${userID}`)
    console.log(api.data);
    setShow(api.data);
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
  showData();
},[]);

const handleTask = () => {
  navigate("/task")
}

const handleSaveChanges = async () => {
  try {
    await axios.patch(`https://backend-mern-crud.onrender.com/profile/id=${userID}`, {
      firstName: show.firstName,
      lastName: show.lastName,
      email: show.email,
      phone: show.phone,
      password: show.password
    })
    setEditData(null);
    showData();
    console.log("profile has been edited")
  } catch (error) {
    console.log(error)
  }
}

const handleCancel = () => {
  setEditData(null);
}

const handleEdit = () => {
  setEditData({ ...show })
}

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditData({ ...editData, [name]: value });
}

  return (
    <div className={styles.container}>
    <p>Hello {show.firstName} Welcome to your profile!</p>
    <div className={styles.btnDiv}>
    
      <div className={styles.buttonSpacer}></div>
      {editData ? (
        <div className={styles.inputTags}>
          <div>
            <input type="text" name="fistName" id="firstName" placeholder='Edit Your First Name' className={styles.changeInp} value={editData.firstName} onChange={(e) => setEditData({ ...editData, firstName: e.target.value })} />
            <br />
            <br />
            <input type="text" name="lastName" id="lastName" placeholder='Edit Your Last Name' className={styles.changeInp} value={editData.lastName} onChange={(e) => setEditData({ ...editData, lastName: e.target.value })} />

            <br />
            <br />
            <input type="email" name="email" id="email" placeholder='Edit Your Email' className={styles.changeInp} value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
            <br />
            <br />
            <input type="number" name="number" id="number" placeholder='Edit Your Phone Number' className={styles.changeInp} value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
            <br />
            <br />
            <input type="password" name="password" id="password" placeholder='Change Your Password' className={styles.changeInp} value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} />
            <br />
            <br />

            <div className={styles.changingBtn}>
            <button className={styles.btn} onClick={handleSaveChanges}>
              Save Changes
            </button>
            <div className={styles.buttonSpacer}></div>
            <button className={styles.btn} onClick={handleCancel}>
              Cancel
            </button>
          </div>
          </div>
        </div>
      ) : (
        <button className={styles.btn} onClick={handleEdit}>
          Edit Profile
        </button>
      )}
    </div>
    <div className={styles.userData}>
      <div>
        <h2>First Name: {show.firstName}</h2>
        <h2>Last Name: {show.lastName}</h2>
        <h2>Email:  {show.email}</h2>
        <h2>Phone Number: {show.phone}</h2>
      </div>
    </div>
  </div>
  )
}

export default Profile