import { useEffect, useState } from "react";
import styles from "./BlogsForm.module.css"; // Import the CSS module
import photo from "../../Assets/Images/Mail.png";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogForm = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(screenWidth < 900 ? "small" : "big");

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      setWidth(newWidth < 1024 ? "small" : "big");
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const addBlog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    axios
      .post("http://localhost:5000/add/blogs", formData)
      .then((response) => {
        console.log("Request sent successfully", response.data);
        if (response.ok) {
          setSuccess(true);
        } else {
          setSuccess(false);
          setFailure(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className={styles.Container}>
        <h1 className={styles.h1}>Add Blog</h1>
        <div className={styles.Top}>
          <div className={styles.Left}>
            <form className={styles.form} action="" onSubmit={addBlog}>
              <label className={styles.name} htmlFor="fullname">
                Full Name
              </label>
              <input
                className={styles.input}
                type="text"
                id="fullname"
                name="author"
              />

              <label className={styles.name} htmlFor="title">
                Title
              </label>
              <input
                className={styles.input}
                type="text"
                id="title"
                name="title"
              />

              <div className={styles.Bottom}>
                <div className={styles.textarea}>
                  <label className={styles.name} htmlFor="content">
                    Content
                  </label>
                  <textarea
                    className={styles.area}
                    id="content"
                    name="content"
                  ></textarea>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Enter an image</label>
                  <input className={styles.input} type="file" name="image" />
                </div>
                <Button color={"red"} size={width} text={"Post Now"} />
                {success && <p>Blog added successfully</p>}
                {failure && <p>An error occured </p>}
                <Link to="/blog">
                  <Button
                    color={"green"}
                    text={"Go back to Blogs"}
                    size={"big"}
                  />
                </Link>
              </div>
            </form>
          </div>

          <div className={styles.photo}>
            <img className={styles.img} src={photo} alt="Mail Rafiki" />
          </div>
        </div>
      </div>
      <ScrollButton />
    </div>
  );
};

export default BlogForm;

// fetch ...
// use state ( categories ) []

// select
// map( key +> {
// <option vlaue={key._id}>{key.name} </option>
// <?selecy>
// })
