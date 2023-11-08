import { useState, useEffect } from "react";
import styles from "./Contact.module.css";
import image from "../../Assets/Images/mobile.png";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";
import emailjs from '@emailjs/browser'

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

  const [formData , setFormData] = useState({
    name : "" ,
    email : "" ,
    subject: "",
    message : "",
  })

  const {name , email , subject , message} = formData

  const handleChange = (e) => {
    const {name , value } = e.target ;
    setFormData((prevData) => ({
        ...prevData, 
        [name] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_gclgezg' , 'template_9uaeona' , e.target , 's5KP7u_1YACGBQ7AF')
    .then((result) => {
        alert('Message sent successfully!')
    }, (error) => {
        alert('Error sending message , please try again')
    });
    resetForm()
  };

  const resetForm = () => {
    setFormData({
        name : "" ,
        email : "" ,
        subject: "",
        message : "",
    })
  }

  return (
    <section>
      <div className={styles.Container}>
        <h1 className={styles.h1}>Contact Us</h1>
        <p className={styles.p}>We are here for you! How can we help?</p>

        <div className={styles.Content}>
          <div className={styles.Left}>
            <form className={styles.form} onSubmit={handleSubmit} method="post" action="#">
              <label className={styles.names} htmlFor="name">
                Name
              </label>
              <input
                className={styles.inputs}
                type="text"
                name="name"
                required
                id="name"
                value={name}
                onChange={handleChange}
              />
              <label className={styles.names} htmlFor="email">
                Email
              </label>
              <input
                className={styles.inputs}
                type="email"
                name="email"
                required
                id="email"
                value={email}
                onChange={handleChange}
              />
              <label className={styles.names} htmlFor="email">
                Subject
              </label>
              <input
                className={styles.inputs}
                type="text"
                name="subject"
                required
                id="subject"
                value={subject}
                onChange={handleChange}
              />
              <label className={styles.names} htmlFor="message">
                Message
              </label>
              <textarea
                className={styles.area}
                name="message"
                cols="30"
                rows="10"
                id="message"
                value={message}
                onChange={handleChange}
              ></textarea>
              <Button type={"submit"} color={"green"} size={width} text={"Submit"} />
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
