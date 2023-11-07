import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./BlogsUpdate.module.css";
import photo from "../../Assets/Images/Mail.png";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";
import axios from "axios";

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

  const { id } = useParams();
  const [existingData, setExistingData] = useState({});
  const [inputData, setInputData] = useState({
    fullname: existingData.author,
    title: existingData.title,
    content: existingData.content,
  });
  const [imageFile, setImageFile] = useState(existingData.image);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/read/blogsById/${id}`);
        if (!response.ok) {
          console.log('error');
        }
        setExistingData(response.data);
        setInputData({
          fullname: response.data.author,
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (name, value) => {
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0] || existingData.image;
    setImageFile(file);
  };

  const handleImageUpdate = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.patch(`http://localhost:5000/update/blogs`,
      {...formData, id : id});

      console.log("Image updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating the image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        author: inputData.fullname,
        title: inputData.title,
        content: inputData.content,
        // Include any other fields that need to be updated.
      };
      console.log(updatedData)
      const response = await axios.patch(`http://localhost:5000/update/blogs`, 
      {image: imageFile,
        ...updatedData, id : id },
      {headers: {'Content-Type' : 'multipart/form-data'}});

      console.log("Blog updated successfully:", response.data);

     
    } catch (error) {
      console.error("Error updating the blog:", error);
    }
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.h1}>Update Blog</h1>
      <div className={styles.Top}>
        <div className={styles.Left}>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <label className={styles.name} htmlFor="fullname">
              Full Name
            </label>
            <input
              className={styles.input}
              type="text"
              id="fullname"
              name="fullname"
              value={inputData.fullname}
              onChange={(e) => handleInputChange("fullname", e.target.value)}
            />

            <label className={styles.name} htmlFor="title">
              Title
            </label>
            <input
              className={styles.input}
              type="text"
              id="title"
              name="title"
              value={inputData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />

            <div className={styles.textarea}>
              <label className={styles.name} htmlFor="content">
                Content
              </label>
              <textarea
                className={styles.area}
                id="content"
                name="content"
                value={inputData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
              ></textarea>
            </div>

            <label className={styles.name}>Select an image</label>
                  <input
                    className={styles.input}
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                  {existingData.image && (
                    <img
                      src={`http://localhost:5000/${existingData.image}`}
                      alt="Current Image"
                      className={styles.currentImage}
                    />
                  )}

            <Button color={"green"} text={"Submit"} size={width} />
          </form>
        </div>

        <div className={styles.photo}>
          <img className={styles.img} src={photo} alt="Mail Rafiki" />
        </div>
      </div>

      <ScrollButton />
    </div>
  );
};

export default BlogUpdate;
