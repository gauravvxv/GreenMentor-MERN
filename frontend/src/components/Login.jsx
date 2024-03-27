import React from 'react'
import styles from "../styles/login.module.css"
import img1 from "../Assets/login1.webp";
import {Link,useNavigate} from "react-router-dom";
import { login } from '../store/actions/authActions';
import { useState } from 'react';
import {useDispatch} from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[formData,setFormData] = useState(
    {
      email: '',
      password: ''
    }
  )
  const [error,setError] = useState("");

  const handleChange = (e) => {
setFormData({...formData,[e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email ||  !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    else{
      dispatch(login(formData,navigate)); 
      
    }
  }

  return (
    <div>
  <div className={styles.container}>
      <div className={styles.parent}>
               <div className={styles.formInp}>
          <form onSubmit={handleSubmit}>
<input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter Your email'  />
<br />
<br />
<input type="password" name="password" value={formData.password} onChange={handleChange}  placeholder='Enter Your password'  />
<br />
<br />
<button type='submit'>Login</button>
          </form>
          <p className={styles.account}>Not a Member ?
          <Link className={styles.link} to="/signup">signup</Link>
          <span>
          </span>
           </p>
           <span className={styles.error}>  
                {error}
              </span>
      </div>
 

          <div>

        <div className={styles.image}>
          <img src={img1} alt="image 1" />
        </div>

 
   
        </div>
      </div>

    
    </div>
    </div>
  )
}

export default Login
