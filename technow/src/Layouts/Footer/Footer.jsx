import styles from"./Footer.module.css"
import React from "react"
import {FaFacebookSquare , FaInstagramSquare, FaLinkedin, FaWhatsappSquare} from 'react-icons/fa'
import {BsFacebook , BsInstagram , BsLinkedin , BsWhatsapp} from 'react-icons/bs'

export const Footer =()=>{
    return (
        <>
        <footer className={styles.footer}>
            <div className={styles.top}></div>

            <div className={styles.footerRow}>

                <div className={styles.footerCol}>
                    <h3 className={styles.h3}>About Us</h3>
                    <p className={styles.p}>Welcome to Technow! We're here to make tech updates easy. 
                        We send you the coolest tech stuff every day.
                        No need to search. Join us and stay tech-smart!</p>
                </div>

                <div className={styles.footerCol}>
                    <h3 className={styles.h3}>Our Pages</h3>
                    <ul className={styles.links}>
                        <li className={styles.li}>NewsLetters</li>
                        <li className={styles.li}>Blogs</li>
                        <li className={styles.li}>Contact Us </li>
                    </ul>
                </div>
            
                <div className={styles.footerCol}>
                    <h3 className={styles.h3}>Category</h3>
                    <ul className={styles.links}>
                        <li className={styles.li}>Engineering</li>
                        <li className={styles.li}>Cloud</li>
                        <li className={styles.li}>Web</li>
                        <li className={styles.li}>App</li>
                        <li className={styles.li}>AI</li>
                    </ul>
                </div>
                <div className={`${styles.footerCol} ${styles.socials}`}>
                    <ul className={styles.icons}>
                        <li className={styles.li}><BsFacebook className={styles.icon}/>Technow Newsletter</li>
                        <li className={styles.li}><BsWhatsapp className={styles.icon}/>+961****</li>
                        <li className={styles.li}><BsInstagram className={styles.icon}/>Technow_Newsletter</li>
                        <li className={styles.li}><BsLinkedin className={styles.icon}/>Technow Newsletter</li>
                    </ul>
                </div>

            </div>

            <div className={styles.copyright}>
                <p className={styles.pcopyright}> &copy; 2023 <span className={styles.technow} > technow</span>. All Rights Reserved </p>
            </div>
        </footer>
    </> 
    );
}