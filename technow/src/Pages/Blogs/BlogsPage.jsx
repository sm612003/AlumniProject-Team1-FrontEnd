import styles from "./BlogsPage.module.css";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";
import { Link } from "react-router-dom";

const BlogCardLayout = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(screenWidth < 1024 ? "small" : "big");

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

  const [blogData, setBlogData] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [error, setError] = useState(false);
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        if(blogData.length===0) setIsLoading(true);
        if (!navigator.onLine) {
          setNetworkError(true);
          setError(false);
          setIsLoading(false);
          return;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_API}/read/blogs`);
        setBlogData(response.data);
        if (!response===200) {
          setError(true);
          setIsLoading(false);
          setError(false);
          setNetworkError(false);
        }
        setBlogData(response.data);
        if (blogData) {
          setIsLoading(false);
          setError(false);
          setNetworkError(false);
        }
      } catch (error) {
        // console.log("error");
        if(error.message === "Network request failed"){
          setNetworkError(true);
          setIsLoading(false);
        }else{
          setError(true);
        }
        window.addEventListener("offline", () => {
          setNetworkError(true);
          setError(false);
          setIsLoading(false);
        });
        console.error("API Error: ", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const errorStyle = {
    display: "flex",
    color: "red",
    padding: "10px",
    borderRadius: "5px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.h1}>Blogs</h1>
          {isLoading ? (
          <div style={containerStyle}>
            <h1>Loading ...</h1>
          </div>
        ) : networkError ? (
          <div style={containerStyle}>
            <h1 style={errorStyle}>Newtwork Issue</h1>
          </div>
        ) : error ? (
          <div style={containerStyle}>
            <h1 style={errorStyle}>News Not Found</h1>
          </div>
        ) : (
          <>
          <span>
          <h2 className={styles.pheader}>Blog your news</h2>
          <Link to="/blogsForm" className={styles.Link}>
            <Button
              color={"green"}
              text={"Add Blog"}
              size={width}
              subscribed={false}
            />
          </Link>
          </span>
          {blogData.map((key, index) => (
            <BlogCard
              key={key._id}
              title={key.title}
              author={key.author}
              image={key.image}
              createdAt={key.createdAt}
              reversed={index % 2 === 0}
              id={key._id}
            />
          ))}
          </> 
        )}
        </header>
      </div>
      <ScrollButton />
    </>
  );
};

export default BlogCardLayout;
