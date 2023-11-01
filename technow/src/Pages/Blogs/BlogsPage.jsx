//import React from "react";
import styles from "./BlogsPage.module.css"
import BlogCard from '../../Components/BlogCard/BlogCard'

const BlogCardLayout =() => {
    
    return(
        <div className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.h1}>Blog your news</h1>
                <p className={styles.pheader}>Blogs</p>
                
                    <BlogCard image />

            
            </header>
        </div>
    );
}

export default BlogCardLayout