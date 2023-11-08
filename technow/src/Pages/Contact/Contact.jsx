import { useState, useEffect } from "react";
import styles from "./Contact.module.css";
import image from "../../Assets/Images/mobile.png";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";
import axios from "axios";

const Contact = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await axios.post("/api/sendContactEmail", data);
      if (response.status === 200) {
        alert("Form submitted successfully");
      } else {
        alert("Form submission failed");
      }
    } catch (error) {
      console.error("Error sending the form data:", error);
      alert("Form submission failed");
    }
  };

  return (
    <section>
      <div className={styles.Container}>
        <h1 className={styles.h1}>Contact Us</h1>
        <p className={styles.p}>We are here for you! How can we help?</p>

        <div className={styles.Content}>
          <div className={styles.Left}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.names} for="name">
                Name
              </label>
              <input
                className={styles.inputs}
                type="text"
                name="name "
                required
                id="name"
              />
              <label className={styles.names} for="email">
                Email{" "}
              </label>
              <input
                className={styles.inputs}
                type="email"
                name="email "
                required
                id="email"
              />
              <label className={styles.names} for="subject">
                Subject{" "}
              </label>
              <input
                className={styles.inputs}
                type="text"
                name="subject"
                required
                id="subjet"
              />
              <label className={styles.names} for="message">
                Message
              </label>
              <textarea
                className={styles.area}
                name="message "
                cols="30"
                rows="10"
                id="message"
              ></textarea>
              <Button color={"green"} size={width} text={"Submit"} />
            </form>
          </div>
          <div className={styles.Right}>
            <img src={image} alt="" className={styles.Img}></img>
          </div>
        </div>
      </div>
      <ScrollButton />
    </section>
  );
};

export default Contact;
