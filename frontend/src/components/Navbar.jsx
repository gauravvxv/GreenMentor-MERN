import React from 'react'
import styles from "../styles/navbar.module.css"
import {Link} from "react-router-dom"
const Navbar = () => {


  return (
    <div className={styles.container}>

      <div className={styles.parent}>

      <div className='child'>
        <div className={styles.heading}>
            <h1>Task Management Application</h1>
        </div>
      </div>

      <div className={styles.btncontainer}>
        <Link className={styles.btn} to={"/profile"}>Profile</Link>
      </div>

      </div>
    </div>
  )
}

export default Navbar
