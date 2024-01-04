import { useContext, useEffect, useState } from "react";
import styles from "./BlogsForm.module.css";
import photo from "../../Assets/Images/Mail.png";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TextEditor from "../../Components/TextEditor/TextEditor";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BlogForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(screenWidth < 900 ? "small" : "big");
  const [blogData, setBlogData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const { logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      setUser(null);

      logout(); // Call the logout function from AuthContext
      navigate("/");
    } catch (error) {
      console.log("err from handle logout", error);
    }
  };
  const showToastMessage = () => {
    toast.success("Blog Added Successfuly  !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
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

  const addBlog = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    axios
      .post(`http://localhost:5000/add/blogs`, formData)
      .then((response) => {
        showToastMessage();
        setSuccessMessage("Blog added successfully!"); // Set success message

        console.log("Request sent successfully", response.data);
        if (response.status === 200) {
          setBlogData(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        console.log("Server error details from add blog:", error);
      });
  };
  // const addBlog = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append("author", e.target.author.value);
  //   formData.append("title", e.target.title.value);
  //   formData.append("content", e.target.content.value);
  //   formData.append("image", e.target.image.files[0]);

  //   // Validate form fields
  //   const validationErrors = validateForm(formData);

  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/add/blogs",
  //       formData
  //     );
  //    if(response){

  //   setSuccessMessage("Blog added successfully!");

  // console.log("Request sent successfully", response.data);

  //    }

  //     if (response.status === 200) {
  //           setLoading(false);
  //       setBlogData(response.data);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     console.log("Server error details:", error.response.data);
  //   }
  // };

  // const validateForm = (formData) => {
  //   const errors = {};

  //   // Check if required fields are empty
  //   if (!formData.get("author")) {
  //     errors.author = "Name is required";
  //   }

  //   if (!formData.get("title")) {
  //     errors.title = "Title is required";
  //   }

  //   if (!formData.get("content")) {
  //     errors.content = "Content is required";
  //   }

  //   if (!formData.get("image")) {
  //     errors.image = "Image is required";
  //     console.log("image required")
  //   }

  //   return errors;
  // };

  return (
    <div>
      <div className={styles.Container}>
        <h1 className={styles.h1}>Add Blog</h1>
        <div className={styles.Top}>
          <div className={styles.Left}>
            <form className={styles.form} action="" onSubmit={addBlog}>
              <TextEditor />
              <label className={styles.name} htmlFor="fullname">
                Full Name
              </label>
              <input
                className={styles.input}
                type="text"
                id="fullname"
                name="author"
                required
              />

              <label className={styles.name} htmlFor="title">
                Title
              </label>
              <input
                className={styles.input}
                type="text"
                id="title"
                name="title"
                required
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
                    required
                  ></textarea>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Enter an image</label>
                  <input
                    className={styles.input}
                    type="file"
                    name="image"
                    required
                  />
                  {errors.image && (
                    <p style={{ color: "red" }}>{errors.image}</p>
                  )}
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    color={"green"}
                    size={width}
                    text={"Post Now"}
                    onClick={showToastMessage}
                  />
                  {/* <button
                    className={styles.logoutBtn}
                    type="submit"
                    onClick={addBlog}
                  >
                    Post now
                  </button> */}
                  <button
                    type="submit"
                    onClick={handleLogout}
                    className={styles.logoutBtn}
                  >
                    Logout
                  </button>
                </div>

                <Link to="/blogs">
                  <Button
                    color={"green"}
                    text={"Go back to Blogs"}
                    size={width}
                  />
                </Link>
                {loading && <p>Adding Blog...</p>}
                {successMessage && (
                  <p style={{ color: "green", fontSize: "bold" }}>
                    {successMessage}
                  </p>
                )}
                {errors.author && (
                  <p style={{ color: "red" }}>{errors.author}</p>
                )}
                {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
                {errors.content && (
                  <p style={{ color: "red" }}>{errors.content}</p>
                )}
                {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
              </div>
            </form>
          </div>

          <div className={styles.photo}>
            <img className={styles.img} src={photo} alt="Mail Rafiki" />
          </div>
        </div>
      </div>
      <ToastContainer />
      <ScrollButton />
    </div>
  );
};

export default BlogForm;
