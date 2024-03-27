import React from 'react'
import img2 from "../Assets/signup.webp"
import styles from "../styles/signup.module.css"
import { Link,useNavigate } from "react-router-dom"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/authActions'
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  })
const [error,setError] = useState("");
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    
    try {
      dispatch(signup(formData))

      setTimeout(()=>{
        navigate("/")
      },1000)
    } catch (error) {
      setError('Failed to create user. Please try again.')
    }
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.parent}>
        <div className={styles.image}>
          <img src={img2} alt="image 1" />
        </div>
        <div className={styles.formInp}>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='Enter Your Firstname' />
            <br />
            <br />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} id="lastname" placeholder='Enter Your Lastname' />
            <br />
            <br />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter Your email' />
            <br />
            <br />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Enter Your phone Number' />
            <br />
            <br />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter Your password' />
            <br />
            <br />
            <button type='submit'>Register</button>
          </form>

          <div className={styles.account}>
            <p>Allready have an account?
              <Link className={styles.link} to="/login">login</Link>
            
            </p>
          </div>
          <span className={styles.error}>  
                {error}
              </span>
        </div>
      </div>


    </div>
  )
}

export default Signup
