import styles from './NotFound.module.css'
import video from '../../Assets/Images/NotFound.mp4'
import Header from '../../Layouts/Header/Header'
import { Button } from '../../Components/Buttons/Buttons'
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(screenWidth < 900 ? 'small' : 'big');

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

    return(
        <div className={styles.Container}>
        <Header/>
        <div className={styles.Content}>
            <div className={styles.Left}>
                <div>
                    <p className={styles.P2}>Page NOT FOUND</p>
                    <p className={styles.P}>Something went wrong</p>
                </div>
                <Link to='/'><Button text={"Go Back Home"} color={"green"} size={width} subscribed={false}/></Link>
            </div>
            <div className={styles.Right}>
                <video id="vid" className={styles.Video} autoPlay loop muted> <source src={video} type='video/mp4'/>Your Browser does not support this video tag.</video>
            </div>
        </div>
        </div>
    )
}

export default NotFound