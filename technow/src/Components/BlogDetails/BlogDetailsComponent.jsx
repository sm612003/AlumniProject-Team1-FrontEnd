import React from "react";
import styles from "./BlogDetails.module.css"

const BlogDetails = () =>{
    return(
        <div className={styles.blogdetails}>
            <div className={styles.top}>
                <h1 className={styles.h1}></h1>
                <p className={styles.p}></p>
            </div>
            <div className={styles.center}>
                
                <img className={styles.image} src={kjgjhgh} alt="blog image" />
            </div>    
                <article className={styles.bottom}>
                    <p className={styles.blogcontent}>
                    </p>
                         
                </article>
            
        </div>
    );
}
export default BlogDetails;