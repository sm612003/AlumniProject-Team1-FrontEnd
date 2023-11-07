import React, { useEffect, useState } from "react";
import styles from "./BlogDetails.module.css"
//import { useParams } from "react-router-dom";
import axios from 'axios';

const BlogDetailsComponent = ({title , author , image , createdAt , content }) =>{
   
    return(
        
        <div className={styles.blogdetails}>
            <div className={styles.top}>
                <h1 className={styles.h1}>{title}</h1>
                <p className={styles.p}>{author}/{createdAt}</p>
            </div>
            <div className={styles.center}>
                
                <img className={styles.image} src={`http://localhost:5000/${image}`} alt="blog image" />
            </div>    
                <article className={styles.bottom}>
                    <p className={styles.blogcontent}>{content}
                    </p>
                         
                </article>
            
        </div>
    );
}
export default BlogDetailsComponent;