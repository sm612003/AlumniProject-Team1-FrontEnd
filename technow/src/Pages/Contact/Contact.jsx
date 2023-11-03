import React from 'react'
import styles from "./Contact.module.css"
import Header from '../../Layouts/Header/Header'
import image from "../../Assets/Images/mobile.png"

const Contact = () => {
    return (

        <section >
            <div className={styles.Container}>
                
                <h1 className={styles.h1}>Contact Us</h1>
                <p>We are here for you! How can we help?</p>

                <div className={styles.Content}>
                    <div className={styles.Left}>
                        <form className={styles.form}>
                            <label className={styles.names} for="name">Name</label>
                            <input className={styles.inputs} type='text'
                                name="user_name " required />
                            <label className={styles.names} for="name">Email </label>
                            <input className={styles.inputs} type='email' placeholder='Email'
                                name="user_email " required />
                            <label className={styles.names} for="name">Message</label>
                            <textarea className={styles.area} name="message "
                                cols="30" rows="10" ></textarea>
                            <button className={styles.btn} type="submit">Submit</button>
                        </form>                    
                    </div>
                        <div className={styles.Right} >
                                    <img src={image} className={styles.Img}></img>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
