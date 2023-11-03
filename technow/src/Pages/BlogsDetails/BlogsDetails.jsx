import styles from "./BlogsDetails.module.css"
import {Button} from "../../Components/Buttons/Buttons"
import React, {useEffect, useState} from "react";
import BlogDetailsComponent from "../../Components/BlogDetails/BlogDetailsComponent"
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";

export const BlogDetails = () => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(screenWidth < 1024 ? 'small' : 'big');

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

    return(
        <div className={styles.container}>
        <BlogDetailsComponent/>
        <Button text="Update" subscribed={false} size={width} color="green" className={styles.button}/>       
        <ScrollButton/>
        </div>
        
    );
}

