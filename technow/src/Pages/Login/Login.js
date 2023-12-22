// Login.js
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css"; // Import your styles

const Login = () => {
  const navigate = useNavigate();
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
            
            navigate("/blog");
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

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/login",
        formData
      );

      console.log(response);

      // Assuming your API returns some kind of token upon successful login
      // You may want to save the token in the local storage or a state variable
      // and use it for authentication in your app

      setLoading(false);
      navigate("/dashboard"); // Redirect to the dashboard or any other route
    } catch (error) {
      setError(true);
      setErrorMessage("Invalid email or password");
      setLoading(false);
    }
  };

  return (
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
        <button type="submit">Log in</button>
        {loading && <p>Loading...</p>}
        {error && <p className={styles["error-message"]}>{errorMessage}</p>}
        <div>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
      <button onClick={handleOAuth}>sign in with google</button>
    </div>
  );
};

export default Login;
