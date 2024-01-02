import styles from './NotFound.module.css'
import video from '../../Assets/Images/NotFound.mp4'
import { Button } from '../../Components/Buttons/Buttons'
import { Link } from 'react-router-dom'

const NotFound = () => {

    return(
        <div className={styles.Container}>
        <div className={styles.Content}>
            <div className={styles.Left}>
                <div>
                    <p className={styles.P2}>Page NOT FOUND</p>
                    <p className={styles.P}>Something went wrong</p>
                </div>
                <Link to='/'><Button text={"Go Back Home"} color={"green"} subscribed={false}/></Link>
            </div>
            <div className={styles.Right}>
                <video id="vid" className={styles.Video} autoPlay loop muted> <source src={video} type='video/mp4'/>Your Browser does not support this video tag.</video>
            </div>
        </div>
        </div>
    )
}

export default NotFound