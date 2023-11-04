import {useState , useEffect} from 'react'
import styles from "./Contact.module.css"
import image from "../../Assets/Images/mobile.png"
import { ScrollButton } from '../../Components/ScrollButton/ScrollButton'
import { Button } from '../../Components/Buttons/Buttons'

const Contact = () => {
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

    return (

        <section >
            <div className={styles.Container}>
                
                <h1 className={styles.h1}>Contact Us</h1>
                <p className={styles.p}>We are here for you! How can we help?</p>

                <div className={styles.Content}>
                    <div className={styles.Left}>
                        <form className={styles.form}>
                            <label className={styles.names} for="name">Name</label>
                            <input className={styles.inputs} type='text'
                                name="user_name " required />
                            <label className={styles.names} for="name">Email </label>
                            <input className={styles.inputs} type='email'
                                name="user_email " required />
                            <label className={styles.names} for="name">Message</label>
                            <textarea className={styles.area} name="message "
                                cols="30" rows="10" ></textarea>
                            <Button color={"green"} size={width} text={"Submit"}/>
                        </form>                    
                    </div>
                        <div className={styles.Right} >
                            <img src={image} alt=""className={styles.Img}></img>
                        </div>
                </div>
            </div>
            <ScrollButton/>
        </section>
    )
}

export default Contact
