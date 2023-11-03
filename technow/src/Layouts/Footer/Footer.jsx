import styles from"./Footer.module.css"
import React from "react"
import {BsFacebook , BsInstagram , BsLinkedin , BsWhatsapp} from 'react-icons/bs'
import { Logo } from "../../Components/Logo/Logo"
import { Link } from "react-router-dom"

const Footer =()=>{
    return (
        <>
        <footer className={styles.footer}>
            <div className={styles.top}></div>

            <div className={styles.footerRow}>
                <div className={styles.footerCol}>
                    <Logo/>
                </div>
                <div className={styles.footerCol}>
                    <h3 className={styles.h3}>About Us</h3>
                    <p className={styles.p}>Welcome to Technow! We're here to make tech updates easy. 
                        We send you the coolest tech stuff every day.
                        No need to search. Join us and stay tech-smart!</p>
                </div>

                <div className={styles.footerCol}>
                    <h3 className={styles.h3}>Our Pages</h3>
                    <ul className={styles.links}>
                    <Link to='newsletter'>
                        <li className={styles.li}>NewsLetters</li>
                    </Link>
                    <Link to='/blog'>
                        <li className={styles.li}>Blogs</li>
                    </Link>
                    <Link to='/contact'>
                        <li className={styles.li}>Contact Us </li>
                    </Link>
                        
                    </ul>
                </div>
            
                <div className={styles.footerCol}>
                    <h3 className={styles.h3}>Category</h3>
                    <ul className={styles.links}>
                        <Link to='/newsletter'>
                            <li className={styles.li}>Engineering</li>
                        </Link>
                        <Link to='/newsletter'>
                            <li className={styles.li}>Cloud</li>
                        </Link>
                        <Link to='/newsletter'>
                            <li className={styles.li}>Web</li>
                        </Link>
                        <Link to='/newsletter'>
                            <li className={styles.li}>App</li>                            
                        </Link>     
                        <Link to='/newsletter'>
                            <li className={styles.li}>AI</li>                            
                        </Link>                    
                    </ul>
                </div>
            </div>
            <div className={`${styles.footerCol} ${styles.socials}`}>
                    <ul className={styles.icons}>
                        <li className={styles.li}><BsFacebook className={styles.icon}/></li>
                        <li className={styles.li}><BsWhatsapp className={styles.icon}/></li>
                        <li className={styles.li}><BsInstagram className={styles.icon}/></li>
                        <li className={styles.li}><BsLinkedin className={styles.icon}/></li>
                    </ul>
                </div>

            <div className={styles.copyright}>
                <p className={styles.pcopyright}> &copy; 2023 <span className={styles.technow} > technow</span>. All Rights Reserved </p>
            </div>
        </footer>
    </> 
    );
}
export default Footer;