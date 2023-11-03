//import React from "react";
import styles from "./BlogsPage.module.css"
import BlogCard from '../../Components/BlogCard/BlogCard'
//import Header from '../../Layouts/Header/Header'
import Footer from '../../Layouts/Footer/Footer'
//import Button from '../../Components/Buttons/Buttons'

const BlogCardLayout =() => {
    
    return(
        <>
            <div className={styles.main}>
                {/* <Header/> */}
                <header className={styles.header}>
                    <h1 className={styles.h1}>Blogs</h1>
                    <p className={styles.pheader}>Blog your news</p>
                    {/* <Button/> */}
                        <BlogCard image />
                </header>
            </div>
            <Footer/>            
        </>
    );
}

export default BlogCardLayout