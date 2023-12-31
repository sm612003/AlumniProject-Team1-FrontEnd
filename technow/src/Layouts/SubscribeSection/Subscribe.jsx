import styles from './Subscribe.module.css'
import { Button } from '../../Components/Buttons/Buttons'
import img from '../../Assets/Images/Envelope-amico.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Subscribe = ({ page }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(screenWidth < 1024 ? 'small' : 'big');
    const [email, setEmail] = useState('');
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

    const background = page === false ? styles.Gray : styles.White;


    // const handleFindNewsletterId = async () => {
    //     try {
    //     // Send a request to find the newsletter and get its ID
    //     const response = await axios.get(`${process.env.REACT_APP_API}/read/newsletter`);
    //     if (response.status === 200) {
    //         const data = response.data 
    //         const newsletter = data[0]
    //         const newsletterId = newsletter._id;
    //         return newsletterId;
    //     }
    //     } catch (error) {
    //     console.log(error)
    //     return null;
    //     }
    // };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email !== '') {
            const excistingUser = await axios.get(`${process.env.REACT_APP_API}/getSubscribedUserByEmail/${email}`,{
            })
            console.log(excistingUser.data.message)
            if (excistingUser.data.message==='success') {
                // toast.error('Already subscribed with this email')
                console.log('Already subscribed with this email')
                return;
            }
            else {
                try {
                    await axios.post(`${process.env.REACT_APP_API}/add/subscribedUsers`, {
                         NewsLetterId: 1,
                         email: email,
                     })
                    //  toast.success('Subscription successful!');
                     console.log(email);
                 } catch (error) {
                     console.log(error)
                 }
             }
        }
        else {
            toast.error('Enter your email')
        }
    };

    return (
        <div className={`${styles.Container} ${background}`}>
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
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className={styles.Email}
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <label className={styles.Label} htmlFor="email">Email</label>
                            </div>
                            <span className={styles.Button}>
                                <Button text="Subscribe" subscribed={true} size={width} color={"green"} />
                            </span>
                        </form>
                    </span>
                </div>
                <div className={styles.Right}>
                    <img className={styles.Image} src={img} alt="email" />
                </div>
            </div>
        </div>
    )
}