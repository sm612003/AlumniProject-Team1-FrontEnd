import { useState , useEffect } from "react";
import axios from "axios";
import NewsUpdate from "./NewsUpdateForm";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import styles from './PageNewsUpdate.module.css'

const UpdateNewsPage = (newsID) => {
    const [newsletterData, setNewsletterData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(screenWidth < 1024 ? 'small' : 'big');
    const [existingData , setExistingData] = useState({})
    const [inputData , setInputData] = useState({
        author: existingData.author,
        title: existingData.title,
        subtitle : existingData.subtitle,
        description : existingData.description,
        date : existingData.date,
        subtitleDescription : existingData.subtitleDescription ,
        links :  existingData.links ,
        Category: existingData.Category, 
        newsletterID: existingData.newsletterID,
    })
    const id = newsID.newsID

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setScreenWidth(newWidth);
            setWidth(newWidth < 1024 ? 'small' : 'big');
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API}/read/category`);
            setCategoriesData(response.data);
          } catch (error) {
            console.error(error);
          }
        }
    
        const fetchNewsletter = async () => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API}/read/newsletter`
            );
            setNewsletterData(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchCategory();
        fetchNewsletter();
      }, []);
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API}/read/newsById/${id}`);
            if (!response === 200 ) {
              console.log('error');
            }
            setExistingData(()=>{
              return response.data
            })
            setInputData({
                author: response.data.author,
                title: response.data.title,
                subtitle : response.data.subtitle,
                description : response.data.description,
                date : response.data.date,
                subtitleDescription : response.data.subtitleDescription ,
                links :  response.data.links ,
                Category: response.data.Category, 
                newsletterID: response.data.newsletterID,
            });
            
          } catch (error) {
            console.log(error);
          }
        };  
        fetchData();
      }, []);

    return(
        <div className={styles.Container}>
            <NewsUpdate 
                newsletterData={newsletterData} 
                categoriesData={categoriesData} 
                width={width} 
                id={id}
                existingData= {existingData}
                inputData={inputData}
                setExistingData={setExistingData}
                setInputData={setInputData} 
            />
        <ScrollButton/>
        </div>
    )
}
export default UpdateNewsPage