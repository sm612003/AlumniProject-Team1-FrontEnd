import { useParams } from "react-router-dom";
import BlogDetailsComponent from "../../Components/BlogDetails/BlogDetailsComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";
import styles from "./BlogsDetails.module.css";
import Toast from "../../Components/Toast/Toast";

//Page
const BlogDetails = () => {
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

  const { id } = useParams();
  const [blogsData, setBlogsData] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        if (blogsData.length === 0) setIsLoading(true);
        if (!navigator.onLine) {
          setNetworkError(true);
          setError(false);
          setIsLoading(false);
          return;
        }
        const response = await axios.get(
          `http://localhost:5000/read/blogsById/${id}`
        );
        if (!response.ok) {
          setError(true);
          setIsLoading(false);
          setError(false);
          setNetworkError(false);
        }
        setBlogsData(response.data);
        if (blogsData) {
          setIsLoading(false);
          setError(false);
          setNetworkError(false);
        }
      } catch (error) {
        if (error.message === "Network request failed") {
          setNetworkError(true);
          setIsLoading(false);
        } else {
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
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div className={styles.container}>
      <Toast />
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
          <h1 style={errorStyle}>An Error Occured While Fetching </h1>
        </div>
      ) : (
        <>
          <BlogDetailsComponent
            id={blogsData._id}
            title={blogsData.title}
            author={blogsData.author}
            image={blogsData.image}
            content={blogsData.content}
            createdAt={blogsData.createdAt}
          />
        </>
      )}
      <Button
        text="Update"
        subscribed={false}
        size={width}
        color="green"
        className={styles.button}
      />
      <ScrollButton />
    </div>
  );
};

export default BlogDetails;
