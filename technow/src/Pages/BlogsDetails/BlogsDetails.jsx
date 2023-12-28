import { useParams } from "react-router-dom";
import BlogDetailsComponent from "../../Components/BlogDetails/BlogDetailsComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import styles from "./BlogsDetails.module.css";

//Page
const BlogDetails = () => {
  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
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
        if (!response===200) {
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
        console.error("API Error: ", error.data);
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
    <div className={styles.container}>
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
      <ScrollButton />
    </div>
  );
};

export default BlogDetails;
