import React from 'react'
import styles from "./Dashboard.module.css"
import DashboardCard from '../../Components/Dashboard Card/DashboardCard'

 const Dashboard = () => {
  return (
    <div className={styles.Dashboard}>
      <nav className={styles.Navbar}>
        <div className={styles.Name}>Dashboard</div>
        <div className={styles.Logo}>Technow</div>
        <div className={styles.Buttons}>
            <button className={styles.Button}>News</button>
            <button className={styles.Button}>Blogs</button>
        </div>
      </nav>
      <div className={styles.Bottom}>
      <div className={styles.Manage}>
        <h1 className={styles.h1}>Manage News</h1>
        <button className={styles.button}>AddNews</button>
      </div>
        <div className={styles.cont}><DashboardCard /></div>
      </div>

    </div>
  )
}

export default Dashboard
