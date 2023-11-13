import { Button } from "../../Components/Buttons/Buttons";
import styles from "./NewsForm.module.css";
import photo from "../../Assets/Images/Mail.png";
import { useState, useEffect } from "react";
// import { useRef } from "react";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import axios from "axios";
import emailjs from '@emailjs/browser'
import 'react-toastify/dist/ReactToastify.css';

const NewsForm = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(screenWidth < 1024 ? "small" : "big");
  // const [Loading,setLoading] = useState(false)
  const [newsletter, setNewsletter] = useState([]);
  // const [success, setSuccess] = useState(false);
  // const [failure, setFailure] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  
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


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/read/category");
        setCategoriesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchNewsletter = async () => {
      try {
        // setLoading(true)
        const response = await axios.get(
          "http://localhost:5000/read/newsletter"
        );
        setNewsletter(response.data);
        // setLoading(false)
       
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchCategory();
    fetchNewsletter();
  }, []);


// const emailRef = useRef('');
// const authorRef = useRef('');
// const titleRef = useRef('');


useEffect(() => emailjs.init('s5KP7u_1YACGBQ7AF') , [])

// const sendEmails = (e) => {
//   e.preventDefault();
//     const serviceId = 'service_gclgezg'
//     const templateId = 'template_stjbtfl'
//     emailjs.send( serviceId , templateId , {
//       author : authorRef.current.value ,
//       title : titleRef.current.value ,
//       email : emailRef.current.value
//     })
//     .then((result) => {
//         alert('Message sent successfully!')
//     }, (error) => {
//         alert('Error sending message , please try again')
//     });
//   };

const addNews = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  axios
  .post("http://localhost:5000/add/news", formData)
  .then((respone) => {
    console.log("Request sent successfully", respone.data);
    if (respone.status === 200) {
      // setSuccess(true);
    } else {
      // setSuccess(false);
      // setFailure(true);
    }
  })
  .catch((error) => {
    console.log(error);
      });
  };
  return (
    <div className={styles.Container}>
      <h1 className={styles.h1}>Add News</h1>
      <div className={styles.Top}>
        <div className={styles.Left}>
          <form className={styles.form} action="" onSubmit={addNews}>
            <label className={styles.name} htmlFor="author">
              Author
            </label>
            <input
              className={styles.input}
              type="text"
              id="author"
              name="author"
              // ref={authorRef}
            />

            <label className={styles.name} htmlFor="title">
              Title
            </label>
            <input
              className={styles.input}
              type="text"
              id="title"
              name="title"
              // ref={titleRef}
            />

            <label className={styles.name} htmlFor="Category">
              Category:
            </label>
            <select className={styles.input} name="Category" id="Category">
              {categoriesData.map((category) => (
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
            >
              {newsletter.map((newsletter) => (
                <option key={newsletter._id} value={newsletter._id}>
                  {newsletter.name}
                </option>
              ))}
            </select>

            <label className={styles.name} htmlFor="date">
              Date
            </label>
            <input className={styles.input} type="date" id="date" name="date" />

            <label className={styles.name} htmlFor="subtitle">
              Subtitle
            </label>
            <input
              className={styles.input}
              type="text"
              id="subtitle"
              name="subtitle"
            />
            <div className={styles.Bottom}>
              <div className={styles.textarea}>
                <label className={styles.name} htmlFor="description">
                  description
                </label>
                <textarea
                  className={styles.area}
                  id="description"
                  name="description"
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
                ></textarea>
              </div>
              {/* {!Loading && newsletter ? 
               newsletter[0].subscribedUser.map((user) =>{
                return <p>{user}</p>}
                <input
                key={user}
                className={styles.hidden}
                type="email"
                id="name"
                name="name"
                ref={emailRef}
                value={user}
              />
                ) : <p>Loading....</p>} */}
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Enter an image</label>
              <input className={styles.input} type="file" name="image" />
            </div>
            <div className={styles.btn}>
              <Button color={"green"} text={"Add News"} size={width} />
            </div>
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

export default NewsForm;
