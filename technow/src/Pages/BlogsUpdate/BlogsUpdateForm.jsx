import {useState , useEffect} from "react";
import styles from "./BlogsUpdate.module.css";
import photo from "../../Assets/Images/Mail.png"
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";


const BlogUpdate = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(screenWidth < 900 ? 'small' : 'big');

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

  return (
    <div className={styles.Container}>
       

      <h1 className={styles.h1}>  Update Blog</h1>
      <div className={styles.Top}>
        <div className={styles.Left}>
          <form className={styles.form} action="">
              <label className={styles.name} htmlFor="fullname">Full Name</label>
              <input className={styles.input} type="text" id="fullname" name="fullname" />
              
              <label className={styles.name} htmlFor="title">Title</label>
              <input  className={styles.input} type="text" id="title" name="title" />

              <label className={styles.name} htmlFor="date">Date</label>
              <input  className={styles.input} type="text" id="date" name="date" />
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
          <Button color={"red"} text={"Update Photo"} size={width}/>
          <Button color={"green"} text={"Submit"} size={width}/>

        </div>
        <ScrollButton/>
    </div>
  );
}

export default BlogUpdate;
