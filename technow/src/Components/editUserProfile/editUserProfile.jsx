import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css'; // Import the CSS file for styling

const EditProfile = () => {
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    verifyPassword: '',
    description: '',
    firstName: '',
    lastName: '',
    Link: '',
    image: null,
  });

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/view-all');
        const userData = response.data.Users[0]; // Extract the user data from the response

        // Update the form data with the fetched user data
        setFormData({
          ...formData,
          ...userData,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Run only once when the component mounts

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
    if (formData.newPassword && formData.newPassword !== formData.verifyPassword) {
      alert("New password and verify password don't match");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.patch('http://localhost:5000/user/update', data);

      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert('Error: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Internal Server Error');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
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

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </label>

        <label>
          Verify New Password:
          <input
            type="password"
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>

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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
