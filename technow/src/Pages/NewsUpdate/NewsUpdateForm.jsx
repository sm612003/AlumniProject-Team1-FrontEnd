import {useState , useEffect} from "react";
import styles from "./NewsUpdate.module.css"; 
import photo from "../../Assets/Images/Mail.png"
import { Button } from "../../Components/Buttons/Buttons";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { useParams } from "react-router-dom";

const NewsUpdate = () => {
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

  const {id} = useParams();
  console.log(id)

  return (   
    <div className={styles.Container}>
      <h1 className={styles.h1}>Update News</h1>
      <div className={styles.Top}>
        <div className={styles.Left}>
          <form className={styles.form} action="">

              <label className={styles.name} htmlFor="author">Author</label>
              <input className={styles.input}  type="text" id="author" name="author" />


              <label className={styles.name} htmlFor="title">Title</label>
              <input className={styles.input} type="text" id="title" name="title" />

              <label className={styles.name} htmlFor="date">Date</label>
              <input className={styles.input}  type="date" id="date" name="date" />

              <label className={styles.name} htmlFor="subtitle">Subtitle</label>
              <input className={styles.input}  type="text" id="subtitle" name="subtitle" />

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
          <div className={styles.textarea}>
            <label  className={styles.name} htmlFor="subcontent">Subtitle Content</label>
            <textarea className={styles.area} id="subcontent" name="subcontent"></textarea>
          </div>
          <div className={styles.textarea} >
            <label  className={styles.name} htmlFor="links">Additional Links</label>
            <textarea className={`${styles.area} ${styles.links}`} id="links" name="links"></textarea>
          </div>
        </div>
        <div className={styles.btn}>
          <Button color={"red"} text={"Upload photo"} size={width}/>
          <Button color={"green"} text={"Add News"} size={width}/>
        </div>
        <ScrollButton/>
    </div>
  );
}

export default NewsUpdate ;