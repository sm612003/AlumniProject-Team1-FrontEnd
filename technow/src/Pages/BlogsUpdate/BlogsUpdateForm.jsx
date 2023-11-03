import React from "react";
import styles from "./BlogsUpdate.module.css";
import photo from "../../Assets/Images/Mail.png"
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";


const BlogUpdate = () => {
  return (
    <div className={styles.Container}>
       

      <h1 className={styles.h1}>  Update Blog</h1>
      <div className={styles.Top}>
        <div className={styles.Left}>
          <form className={styles.form} action="">

            <div className={styles.inputs}>
              <label className={styles.name} htmlFor="fullname">Full Name</label>
              <input  type="text" id="fullname" name="fullname" />
            </div>
            <div className={styles.inputs}>
              <label className={styles.name} htmlFor="title">Title</label>
              <input type="text" id="title" name="title" />
            </div>
            <div className={styles.inputs}>
              <label className={styles.name} htmlFor="date">Date</label>
              <input  type="text" id="date" name="date" />
            </div>
            </form>
        </div>

        <div className={styles.photo}>
          <img className={styles.img} src={photo} alt="Mail Rafiki" />
        </div>
      </div >

        <div className={styles.Bottom}>
          <div className={styles.textarea}>
            <label  className={styles.name} htmlFor="content">Content</label>
            <textarea className={styles.area} id="content" name="content"></textarea>
          </div>
        </div>
        <ScrollButton/>
    </div>
  );
}

export default BlogUpdate;
