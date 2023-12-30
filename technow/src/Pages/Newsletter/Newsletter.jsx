import { useState, useEffect } from "react";
import NewsCard from "../../Components/NewsCard/News";
import styles from "./Newsletter.module.css";
import axios from "axios";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import magnifire from "../../Assets/Images/magnifire.jpeg";

//Page
const Newsletter = () => {
  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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
          `${process.env.REACT_APP_API}/read/news`
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
  // Handles changes in the search input.
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const filterNewsByTitle = (newsToFilter, searchInput) => {
    if (searchInput) {
      
      return newsToFilter.filter(
        (ray) =>
       
          ray.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          ray.author.toLowerCase().includes(searchInput.toLowerCase()) 
          // ray.first[0].toLowerCase().includes(searchInput.toLowerCase())
      );
      
    }
    
    return newsToFilter;
  };
  const filterNews = filterNewsByTitle(newsData, searchInput);
  console.log("filtered blogg :  " + filterNews);

  return (
    <>
      <div className={styles.Container}>
        <h1 className={styles.H1}>Latest News</h1>
        <form className={styles.bookSearch}>
          <input
            id="search"
            className={styles.inputSearch}
            type="text"
            placeholder="   Search For News's Title, Or Author's name"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button type="button" className={styles.searchButton}>
            <img src={magnifire} alt="search img" width="25" height="20" />
          </button>
        </form>
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
            <article className={styles.Newsletter}>
              {filterNews.length > 0 ? (
                filterNews.map((key, index) => (
                  <NewsCard
                    key={key._id}
                    first={index === 0}
                    title={key.title}
                    image={key.image}
                    author={key.author}
                    date={key.date}
                    id={key._id}
                  ></NewsCard>
                ))
              ) : (
                <p style={{ color: "#ff0000", marginTop: "10px" }}>
                  No matching blogs found.
                </p>
              )}
            </article>
          </>
        )}
      </div>
      <ScrollButton />
    </>
  );
};

export default Newsletter;
