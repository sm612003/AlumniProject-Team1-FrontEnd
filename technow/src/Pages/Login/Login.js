// Login.js
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css"; // Import your styles
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  //network err
  const [networkError, setNetworkError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
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
            navigate("/blogsForm");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

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

      if (response) {
        setUser(response.data);
        console.log("role: " + response.data.role);

        if (response.data.role === "admin") {
          navigate("/dashboard"); // Redirect to the dashboard or any other route
        } else {
          navigate("/blogsForm"); // Redirect to the dashboard or any other route
        }
        setLoading(false);
      }
    } catch (error) {
      if (error.message === "Network request failed") {
        setNetworkError(true);
        setIsLoading(false);
      } else {
        setError(true);
        setErrorMessage("Invalid email or password");
        setLoading(false);
      }
    }
  };

  return (
    <body>
      <div className={styles.container}>
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
              <label>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
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
