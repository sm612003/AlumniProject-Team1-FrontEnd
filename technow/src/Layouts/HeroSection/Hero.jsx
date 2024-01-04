import styles from './Hero.module.css'
import { useState, useEffect } from 'react'
import video from '../../Assets/Images/Newsletter.mp4'
import LazyLoad from 'react-lazy-load';
export const HeroSection = () => {
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
        <div className={styles.Content}>
            <div className={styles.Left}>
                <h1 className={styles.H1}>
                    Bring back the joy of reading newsletters
                </h1>
                <span className={styles.Span}>
                    <ul className={styles.Ul} >
                        <li className={styles.Li}>Save time and read your newsletters in one place.</li>
                        <li className={styles.Li}>Organize your newsletter feed according to your interests.</li>
                        <li className={styles.Li}>Forget about newsletters emails and focus only in reading.</li>
                    </ul>
                </span>

            </div>
            <div className={styles.Right}>
                {/* Lazy load the video using react-lazyload */}
                <LazyLoad offset={100}>
                    <video id="vid" className={styles.Video} autoPlay loop muted>
                        <source src={video} type="video/mp4" />
                        Your Browser does not support this video tag.
                    </video>
                </LazyLoad>
            </div>
        </div>
    )
}

export default HeroSection;