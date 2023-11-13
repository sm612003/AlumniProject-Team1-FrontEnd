import { useState } from "react";
import styles from "./NewsUpdate.module.css";
import { Button } from "../../Components/Buttons/Buttons";
import axios from "axios";

const NewsUpdate = ({
  id,
  newsletterData,
  categoriesData,
  width,
  existingData,
  inputData,
  setInputData,
  setExistingData,
}) => {
  const [imageFile, setImageFile] = useState(existingData.image);
  console.log(existingData);
  const handleInputChange = (name, value) => {
    setInputData({
      ...inputData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0] || existingData.image;
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        author: inputData.author,
        title: inputData.title,
        subtitle: inputData.subtitle,
        description: inputData.description,
        date: inputData.date,
        subtitleDescription: inputData.subtitleDescription,
        links: inputData.links,
        Category: inputData.Category,
        newsletterID: inputData.newsletterID,
      };
      console.log(updatedData);
      const response = await axios.patch(
        `${process.env.REACT_APP_API}/update/news`,
        { image: imageFile, ...updatedData, id: id },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("News updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating the news:", error);
    }
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.h1}>Update News</h1>
      <div className={styles.Top}>
        <div className={styles.Left}>
          <form className={styles.form} action="" onSubmit={handleSubmit}>
            <label className={styles.name} htmlFor="author">
              Author
            </label>
            <input
              className={styles.input}
              type="text"
              id="author"
              name="author"
              value={inputData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
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

            <label className={styles.name} htmlFor="Category">
              Category:
            </label>
            <select
              className={styles.input}
              name="Category"
              id="Category"
              value={inputData.Category}
              onChange={(e) => handleInputChange("Category", e.target.value)}
            >
              {categoriesData &&
                categoriesData.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>

            <label className={styles.name} htmlFor="newsletter">
              Newsletter:
            </label>
            <select
              className={styles.input}
              name="newsletterID"
              id="newsletter"
              value={inputData.newsletterID}
              onChange={(e) =>
                handleInputChange("newsletterID", e.target.value)
              }
            >
              {newsletterData &&
                newsletterData.map((newsletter) => (
                  <option
                    key={newsletter._id}
                    value={newsletter._id}
                    className={styles.options}
                  >
                    {newsletter.name}
                  </option>
                ))}
            </select>

            <label className={styles.name} htmlFor="date">
              Date
            </label>
            <input
              className={styles.input}
              type="date"
              id="date"
              value={inputData.date}
              name="date"
              onChange={(e) => handleInputChange("date", e.target.value)}
            />

            <label className={styles.name} htmlFor="subtitle">
              Subtitle
            </label>
            <input
              className={styles.input}
              type="text"
              id="subtitle"
              value={inputData.subtitle}
              name="subtitle"
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
            />
            <div className={styles.Bottom}>
              <div className={styles.textarea}>
                <label className={styles.name} htmlFor="description">
                  Description
                </label>
                <textarea
                  className={styles.area}
                  id="description"
                  name="description"
                  value={inputData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                ></textarea>
              </div>
              <div className={styles.textarea}>
                <label className={styles.name} htmlFor="subtitleDescription">
                  Subtitle Content
                </label>
                <textarea
                  className={styles.area}
                  id="subtitleDescription"
                  name="subtitleDescription"
                  value={inputData.subtitleDescription}
                  onChange={(e) =>
                    handleInputChange("subtitleDescription", e.target.value)
                  }
                ></textarea>
              </div>
              <div className={styles.textarea}>
                <label className={styles.name} htmlFor="links">
                  Additional Links
                </label>
                <textarea
                  className={`${styles.area} ${styles.links}`}
                  id="links"
                  name="links"
                  value={inputData.links}
                  onChange={(e) => handleInputChange("links", e.target.value)}
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
                  src={`${process.env.REACT_APP_API}/${existingData.image}`}
                  alt="Current Img"
                  className={styles.currentImage}
                />
              )}
            </div>
            <div className={styles.btn}>
              <Button
                color={"green"}
                text={"Update News"}
                type="submit"
                size={width}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsUpdate;
