import {useEffect , useState} from 'react'
import styles from "./Dashboard.module.css"
import DashboardCard from '../../Components/Dashboard Card/DashboardCard'
import { ScrollButton } from '../../Components/ScrollButton/ScrollButton'
import { Button } from '../../Components/Buttons/Buttons'

 const Dashboard = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(screenWidth < 1024 ? 'small' : 'big');

  useEffect(() => {
      const handleResize = () => {
          const newWidth = window.innerWidth;
          setScreenWidth(newWidth);
          setWidth(newWidth < 1024 ? 'small' : 'big');
      };
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);
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
        <Button color={"green"} text={'Add News'} size={width} subscribed={false}/>
      </div>
        <div className={styles.cont}><DashboardCard /></div>
      </div>
      <ScrollButton/>
    </div>
  )
}

export default Dashboard
