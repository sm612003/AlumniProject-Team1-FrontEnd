// import { useEffect, useState } from "react";
// import styles from "./BlogsForm.module.css"; // Import the CSS module
// import photo from "../../Assets/Images/Mail.png";
// import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
// import { Button } from "../../Components/Buttons/Buttons";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import TextEditor from "../../Components/TextEditor/TextEditor";

// const BlogForm = (props) => {
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [width, setWidth] = useState(screenWidth < 900 ? "small" : "big");
//   const [blogData, setBlogData] = useState([]);
// const { token } = props.location.state || {};

//   useEffect(() => {
//     const handleResize = () => {
//       const newWidth = window.innerWidth;
//       setScreenWidth(newWidth);
//       setWidth(newWidth < 1024 ? "small" : "big");
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // const addBlog = (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData(e.target);

//   //   axios
//   //     .post(`http://localhost:5000/add/blogs`, formData)
//   //     .then((response) => {
//   //       console.log("Request sent successfully", response.data);
//   //       if (response === 200) {
//   //         setBlogData(response.data);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //       console.log("Server error details:", error.response.data);
//   //     });
//   // };
//   const addBlog = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     if (!token) {
//       console.log("Token is undefined");
//       // Handle the case where token is undefined (redirect to login, show a message, etc.)
//       return;
//     }

//     axios
//       .post(`http://localhost:5000/add/blogs`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log("Request sent successfully", response.data);
//         if (response.status === 200) {
//           setBlogData(response.data);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         console.log("Server error details:", error.response.data);
//       });
//   };

//   return (
//     <div>
//       <div className={styles.Container}>
//         <h1 className={styles.h1}>Add Blog</h1>
//         <div className={styles.Top}>
//           <div className={styles.Left}>
//             <form className={styles.form} action="" onSubmit={addBlog}>
//               <TextEditor />
//               <label className={styles.name} htmlFor="fullname">
//                 Full Name
//               </label>
//               <input
//                 className={styles.input}
//                 type="text"
//                 id="fullname"
//                 name="author"
//               />

//               <label className={styles.name} htmlFor="title">
//                 Title
//               </label>
//               <input
//                 className={styles.input}
//                 type="text"
//                 id="title"
//                 name="title"
//               />

//               <div className={styles.Bottom}>
//                 <div className={styles.textarea}>
//                   <label className={styles.name} htmlFor="content">
//                     Content
//                   </label>
//                   <textarea
//                     className={styles.area}
//                     id="content"
//                     name="content"
//                   ></textarea>
//                 </div>

//                 <div className={styles.inputContainer}>
//                   <label className={styles.label}>Enter an image</label>
//                   <input className={styles.input} type="file" name="image" />
//                 </div>
//                 <Button color={"red"} size={width} text={"Post Now"} />
//                 <Link to="/blog">
//                   <Button
//                     color={"green"}
//                     text={"Go back to Blogs"}
//                     size={"big"}
//                   />
//                 </Link>
//               </div>
//             </form>
//           </div>

//           <div className={styles.photo}>
//             <img className={styles.img} src={photo} alt="Mail Rafiki" />
//           </div>
//         </div>
//       </div>
//       <ScrollButton />
//     </div>
//   );
// };

// export default BlogForm;

import { useContext, useEffect, useState } from "react";
import styles from "./BlogsForm.module.css";
import photo from "../../Assets/Images/Mail.png";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TextEditor from "../../Components/TextEditor/TextEditor";
import { AuthContext } from "../../Context/AuthContext";
const BlogForm = () => {
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
      })
      .catch((error) => {
        console.log(error);
        console.log("Server error details from add blog:", error);
      });
  };

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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button color={"green"} size={width} text={"Post Now"} />
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
                {/* <Button type={"submit"} text={"Log out"} size={"big"} onClick={handleLogout}>
                  Logout
                </Button> */}
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
