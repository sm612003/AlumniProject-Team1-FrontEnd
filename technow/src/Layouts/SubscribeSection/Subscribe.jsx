import styles from './Subscribe.module.css'
import { Button } from '../../Components/Buttons/Buttons'
import img from '../../Assets/Images/Envelope-amico.png'
import {useState , useEffect} from 'react'

export const Subscribe = () => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return(
        <div className={styles.Container}>
            <h1 className={styles.H1}> 
                Subscribe to Mail Newsletter
            </h1>
            <div className={styles.Content}>
                <div className={styles.Left}>
                    <span className={styles.Span}>
                        <h2 className={styles.H2} >
                            Bring back the joy of reading newsletters 
                        </h2>
                        <p className={styles.P} >
                            Subscribe and be ready for an amazing experience   
                        </p>                        
                    </span>
                    <span>
                        <form action="" onSubmit={handleSubmit}>
                            <div className={styles.Input}>
                                <input id ="email" type="email" name="email" className={styles.Email} placeholder='Email'/>
                                <label className={styles.Label} htmlFor="email">Email</label>
                            </div>
                            <span className={styles.Button}>
                                <Button text="Subscribe" subscribed={true} size={width} color={"green"}/>
                            </span>  
                        </form>                      
                    </span>
                </div>
                <div className={styles.Right}>
                    <img className={styles.Image} src={img} alt="bla bla" />
                </div>
            </div>
        </div>
    )
}