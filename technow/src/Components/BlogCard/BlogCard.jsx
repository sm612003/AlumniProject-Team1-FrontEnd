//import React from "react";
import styles from "./BlogCard.module.css"
import photo from "../../images/pic.jpg"


 const BlogCard = (porps)=>{
    //const {image, authorDate, header, text } = props
    return(
        <div className={styles.blogtitle}>
           
            <div className={styles.blogcontent}>
                <div className={styles.mainimage}>
                    <img src={photo} className={styles.image} alt="Image for the blog"></img>
                </div>
                <div className={styles.maincontent}>
                    <p className={styles.pclass}>By Rob Enderle | September 11, 2023</p>
                    <h2 className={styles.h2}>With the Advent of AI, It's Time To Rethink Human Resources</h2>
                    <p className={styles.pcontent}>AI could have a huge positive impact on work/life balance, fair compensation, 
                     and turning companies into better workplaces.
                     Still, too often, AI is positioned as a threat to employees instead of a benefit. Let's talk about the potential of AI to improve employee-employer relations and help executive...</p>
                </div>
            </div>
            
        </div>
    
    );
}
export default BlogCard