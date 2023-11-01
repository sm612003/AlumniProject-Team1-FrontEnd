import styles from"./Footer.module.css"
import React from "react"
import {FaFacebook , FaInstagram} from 'react-icons/fa'

export const Footer =()=>{
    return (
        <footer>
        <div className="aboutUs">
            <h3>ABout Us</h3>
            <p></p>
        </div>
        <div className="ourPages">
            <h3>Our Pages</h3>
            <ul>
                <li>NewsLetters</li>
                <li>Blogs</li>
                <li>Contact Us </li>
            </ul>
        </div>
        <div className="categories">
            <h3>Category</h3>
            <ul>
                <li>Engineering</li>
                <li>Cloud</li>
                <li>Web</li>
                <li>App</li>
                <li>AI</li>
            </ul>
        </div>
        <div className="socialMedia">
            <ul>
                <li><FaFacebook className="facebook"/>Technow Newsletter</li>
                <li>+961****</li>
                <li><FaInstagram className="instagram"/>Technow_Newsletter</li>
                <li>Technow Newsletter</li>
            </ul>
        </div>
        <div>
            &copy; TechNow. All Rights Reserved
        </div>   
        </footer>
    )
}