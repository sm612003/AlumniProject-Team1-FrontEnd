// Login.js
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css"; // Import your styles
import { AuthContext } from "../../Context/AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { setUser, user } = useContext(AuthContext); // Use the useContext hook to access setUser and state
  const navigate = useNavigate();
  const [networkError, setNetworkError] = useState(false); //network err
  const [isLoading, setIsLoading] = useState(false);
  const showToastRef = useRef(false);

  //toast message for login page
  const showToastMessage = () => {
    toast.success("Please Log In To Add Blog !", {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  // Call showToastMessage when the component mounts (on the open of login page the toast will appear)
  useEffect(() => {
    if (!showToastRef.current) {
      showToastMessage();
      showToastRef.current = true;
    }
  }, []);
  // handle Network err
  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // LOGIN form handle input change
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
//   // login process
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!navigator.onLine) {
//       setNetworkError(true);
//       setError(false);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:5000/user/login", {
//         ...formData,
//       });
//       console.log("Server Response:", response); // Log the entire server response

//       console.log("Hashed Password in Database:", user.password); // Log hashed password in the database

//       if (response.data) {
//         setUser(response.data); // Assuming user data is nested under response.data
//         localStorage.setItem("authUser", JSON.stringify(response.data.user));

//         console.log("role: " + response.data.role);
//         console.log("responce and data of login", response.data);
//         console.log("responce of login", response);
//         console.log("localstorage :", localStorage);
//         const local = localStorage.getItem("state",JSON.parse(response.data.user))
        
     
//         if(local){
// console.log("local storage ",local)
//         }
        
//         if (response.data.role === "admin") {
//           navigate("/dashboard");
//         } else {
//           navigate("/blogsForm");
//         }
//         setLoading(false);
//       }
//     } catch (error) {
//       if (error.message === "Network request failed") {
//         setNetworkError(true);
//         setIsLoading(false);
//       } else {
//         console.log("err", error);
//         setError(true);
//         setErrorMessage("Invalid email or password");
//         setLoading(false);
//       }
//     }
//   };
// login from dev 
 const handleLogin = async (e) => {
   e.preventDefault();
   if (!navigator.onLine) {
     setNetworkError(true);
     setError(false);
     setIsLoading(false);
     return;
   }

   try {
     setLoading(true);
     const response = await axios.post(
       "http://localhost:5000/user/login",
       formData
     );

     console.log(response.data);
     console.log(response);

     if (response.data) {
       setUser(response.data); // Assuming user data is nested under response.data
       console.log("role: " + response.data.role);

       if (response.data.role === "admin") {
         navigate("/dashboard");
       } else {
         navigate("/blogsForm");
       }
       setLoading(false);
     }
   } catch (error) {
     if (error.message === "Network request failed") {
       setNetworkError(true);
       setIsLoading(false);
     } else {
       console.log("err", error);
       setError(true);
       setErrorMessage("Invalid email or password");
       setLoading(false);
     }
   }
 };

  // Google login process
  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await axios
        .post("http://localhost:5000/google/auth", {
          firstName: result.user.displayName,
          lastName: result.user.displayName,
          email: result.user.email,
          role: "user",
        })

        .then((res) => {
          console.log(res);
          if (res) {
            setUser(res.data);
            console.log("loca data printed")

            navigate("/blogsForm");
          }
        });
    } catch (err) {
      console.log("OAuth: ", err);
    }
  };
  // // google from dev
  //  const handleOAuth = async () => {
  //    try {
  //      const provider = new GoogleAuthProvider();
  //      const auth = getAuth(app);

  //      const result = await signInWithPopup(auth, provider);
  //      console.log(result);

  //      const res = await axios
  //        .post("http://localhost:5000/google/auth", {
  //          firstName: result.user.displayName,
  //          lastName: result.user.displayName,
  //          email: result.user.email,
  //          role: "user",
  //        })

  //        .then((res) => {
  //          console.log(res);
  //          if (res) {
  //            setUser(res.data);

  //            navigate("/blogsForm");
  //          }
  //        });
  //    } catch (err) {
  //      console.log("OAuth: ", err);
  //    }
  //  };
  //CHECK the user if LOGED IN BEFORE dont ask for another login every time need to add blog
  useEffect(() => {
    const checkLoggedInUser = async () => {
      if (localStorage.getItem("authUser") && user) {
        // If authUser exists in localStorage and user is not null,
        // it means the user is already logged in.
        // You can redirect them to the appropriate page.
        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/blogsForm");
        }
      }
    };
    checkLoggedInUser();
  }, [user]); // Run this effect whenever the user state changes

  // PASSWOED HIDE AND SHOW
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const passwordInputType = showPassword ? "text" : "password";
  return (
    <body>
      <div className={styles.container}>
        <ToastContainer></ToastContainer>
        <div className={styles["login-container"]}>
          <form onSubmit={handleLogin} className={styles["login-form"]}>
            <h2>Login</h2>
            <div className={styles["form-group"]}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <div className={styles["passwordInputContainer"]}>
                <label>Password</label>
                <input
                  type={passwordInputType}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <div
                  className={styles["password-toggle"]}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>
            </div>
            <button className={styles.logbtn} type="submit">
              Log in
            </button>
            {loading && <p>Loading...</p>}
            {error && <p className={styles["error-message"]}>{errorMessage}</p>}
            {networkError && (
              <h4 className={styles["error-message"]}>Network Issue</h4>
            )}
            <div>
              <p>
                Not a member ? <Link to="/signup">create an account</Link>
              </p>
            </div>
          </form>
          <button onClick={handleOAuth}>sign in with google</button>
        </div>
      </div>
    </body>
  );
};

export default Login;
