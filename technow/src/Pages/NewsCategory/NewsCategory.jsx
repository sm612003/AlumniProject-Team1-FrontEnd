import { useState, useEffect } from "react";
import { Button } from "../../Components/Buttons/Buttons";
import NewsCard from "../../Components/NewsCard/News";
import styles from "../../Pages/Newsletter/Newsletter.module.css";
import axios from "axios";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { useParams } from "react-router-dom";
import Category from "../../Components/CategoryCard/Category";

//Page
const NewsCategory = () => {
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

  const { categoryName } = useParams();
  console.log(categoryName);
  const [newsData, setNewsData] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (newsData.length === 0) setIsLoading(true);
        if (!navigator.onLine) {
          setNetworkError(true);
          setError(false);
          setIsLoading(false);
          return;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_API}/read/news/byCategory/${categoryName}`
        );
        if (!response.ok) {
          setError(true);
          setIsLoading(false);
          setError(false);
          setNetworkError(false);
        }
        setNewsData(response.data);
        if (newsData) {
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
  }, [categoryName]);

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
      <div className={styles.Container}>
        <h1 className={styles.H1}>Latest News</h1>

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
          <Category/>
            <article className={styles.Newsletter}>
              {newsData.map((key, index) => (
                <NewsCard
                  key={key._id}
                  first={index === 0}
                  title={key.title}
                  image={key.image}
                  author={key.author}
                  date={key.date}
                  id={key._id}
                ></NewsCard>
              ))}
            </article>
            <div className={styles.btn}>
              <Button
                text="Load more"
                size={width}
                color={"green"}
                subscribed={false}
              />
            </div>
          </>
        )}
      </div>
      <ScrollButton />
    </>
  );
};

export default NewsCategory;
