import { useParams } from "react-router-dom";
import NewsDetails from "../../Components/NewsDetails/NewsDetails"
import { useState , useEffect } from "react";
import axios from "axios";
import styles from './NewsletterDetails.module.css'

//Page 
const NewsletterDetails =() => {
  const {id} = useParams();
  const [newsData , setNewsData] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
          try{ 
              if(newsData.length === 0)
                  setIsLoading(true)
              if (!navigator.onLine) {
                  setNetworkError(true);
                  setError(false);
                  setIsLoading(false)
                  return;
                }
              const response = await axios.get(`http://localhost:5000/read/newsById/${id}`) ;
                if(!response.ok){
                  setError(true)
                  setIsLoading(false)
                  setError(false)
                  setNetworkError(false)
                }
              setNewsData(response.data);
              if(newsData){
                  setIsLoading(false)
                  setError(false)
                  setNetworkError(false)
              }
          } catch(error){
              if (error.message === "Network request failed") {
                  setNetworkError(true);
                  setIsLoading(false)
                } else {
                  setError(true);
                }
                window.addEventListener("offline", () => {
                  setNetworkError(true);
                  setError(false);
                  setIsLoading(false)
                });
                console.error("API Error: ", error);
                setIsLoading(false);
          }
      };
  },) ;

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

    return(
      <div className={styles.Container}>
        {isLoading ? (
            <div style={containerStyle}>
              <h1 >Loading ...</h1>
            </div>
        ) : networkError? (
            <div style={containerStyle}>
              <h1 style={errorStyle}>Newtwork Issue</h1>
            </div> 
        ) : error ? (
            <div style={containerStyle}>
              <h1 style={errorStyle}>An Error Occured While Fetching </h1>
            </div>
        ): (
            <>
              <NewsDetails 
                title = {newsData.title}
                author = {newsData.author}
                date = {newsData.date}
                image = {newsData.image}
                desc = {newsData.description}
                sub = {newsData.subtitle}
                subDesc ={newsData.subtitleDescription}
                links = {newsData.links}
              />
            </>
        )}
      </div>
    )
}
export default NewsletterDetails;