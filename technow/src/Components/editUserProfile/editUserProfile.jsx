import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import image from "../../Assets/Images/Mail.png";
import styles from "../editUserProfile/EditProfile.module.css";
import { AuthContext } from "../../Context/AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Event } from "@mui/icons-material";

// const EditProfile = () => {
//   const [formData, setFormData] = useState({
//     password: '',
//     newPassword: '',
//     verifyPassword: '',
//     description: '',
//     firstName: '',
//     lastName: '',
//     Link: '',
//     image: null,
//   });

//   useEffect(() => {
//     // Fetch user data when the component mounts
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/user/view-all');
//         const userData = response.data.Users[0]; // Extract the user data from the response

//         // Update the form data with the fetched user data
//         setFormData({
//           ...formData,
//           ...userData,
//         });
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []); // Run only once when the component mounts

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure the new password and verify password match
//     if (formData.newPassword && formData.newPassword !== formData.verifyPassword) {
//       alert("New password and verify password don't match");
//       return;
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       data.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.patch('http://localhost:5000/user/update', data);

//       if (response.status === 200) {
//         alert(response.data.message);
//       } else {
//         alert('Error: ' + response.data.error);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Internal Server Error');
//     }
//   };
const EditProfile = () => {
  const navigate = useNavigate();
  const { setUser, user, fetchUserData } = useContext(AuthContext);
    const { id } = useParams();
  const [userList, setUserList] = useState([]);

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    verifyPassword: "",
    description: "",
    firstName: "",
    lastName: "",
    Link: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    setLoading(true);
const fetchData = async () => {
console.log("  fetch one data called"  )
try {
    const response = await axios.get(`http://localhost:5000/user/view-one/${id}`);
    const userData = response.data; // Assuming the user data is in response.data
console.log("res data for one id", response.data.User.id);
    if (response) {
      // Access the 'id' property here
      console.log("id",response.data.User.id);
      setFormData(response.data.User)
    } else {
      console.error("User data or id is undefined.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
    fetchData();
  }, []);

 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the new password and verify password match
    if (
      formData.newPassword &&
      formData.newPassword !== formData.verifyPassword
    ) {
      alert("New password and verify password don't match");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {


      const response = await axios.patch(
        `http://localhost:5000/user/update/${id}`,
        data
      );

      if (response.status === 200) {
       
        alert(response.data.message);
        fetchAllUsers();
      } else {
        alert("Error: " + response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal Server Error");
    }
  };

  // PASSWOED HIDE AND SHOW
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const passwordInputType = showPassword ? "text" : "password";
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/view-all");
        setUserList(response.data.Users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchAllUsers();
    }, []);
// description
  const [descriptionOptions, setDescriptionOptions] = useState([
    "SOFTWARE_DEVELOPMENT",
    "DATA_ANALYTICS",
    "USER_INTERFACE_DESIGN",
    "NETWORK_INFRASTRUCTURE",
    "DEVOPS",
  ]);
  return (
    <div className={styles["edit-profile-container"]}>
      <h2 className={styles.title}>Edit Profile</h2>
      <div className={styles["form-and-image-container"]}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.Label}>
            First Name:
            <input
              className={styles.inputstyle}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          {/* <label>
            New Password:
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </label> */}
          <div className={styles["passwordInputContainer"]}>
            <label>Password</label>
            <input
              type={passwordInputType}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              // required
              disabled={loading}
            />
            <div
              className={styles["password-toggle"]}
              onClick={handleTogglePassword}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
          {/* <label>
            Verify New Password:
            <input
              type="password"
              name="verifyPassword"
              value={formData.verifyPassword}
              onChange={handleChange}
            />
          </label> */}
          <div className={styles["passwordInputContainer"]}>
            <label>Verify New Password:</label>
            <input
              type={passwordInputType}
              name="verifyPassword"
              value={formData.verifyPassword}
              onChange={handleChange}
              // required
              disabled={loading}
            />
            <div
              className={styles["password-toggle"]}
              onClick={handleTogglePassword}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
          <label>Description: </label>
          {/* <textarea
            className={styles.inputstyle}
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea> */}
          <select
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            // required
          >
            <option value="" disabled>
              Select a description
            </option>
            {descriptionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label>
            Link:
            <input
              type="text"
              name="Link"
              value={formData.Link}
              onChange={handleChange}
            />
          </label>
          <label>
            Profile Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
          <button className={styles.buttonstyle} type="submit">
            Save Changes
          </button>
        </form>
        <div className={styles["image-container"]}>
          <img className={styles.img} src={image} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
