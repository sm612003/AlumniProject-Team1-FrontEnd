//import React from "react";
import styles from "./BlogCard.module.css"
import {FaTrashCan} from 'react-icons/fa6'

 const BlogCard = ({title  , author , image , createdAt , reversed})=>{
    const reverse = reversed === true ? styles.blogReverse : styles.blogNormal ;
    return(   
            <div className={`${styles.blogcontent} ${reverse}`}>
                <div className={styles.mainimage}>
                    <img src={`http://localhost:5000/${image}`} className={styles.image} alt="Image for the blog"></img>
                </div>
                <div className={styles.maincontent}>
                    <p className={styles.pclass}>{author} / {createdAt}</p>
                    <h2 className={styles.h2}>{title}</h2>
                     <div className={styles.icons}><FaTrashCan/></div>
                </div>
            </div>
    );
}
export default BlogCard