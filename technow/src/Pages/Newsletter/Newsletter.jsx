import { useState , useEffect} from 'react'
import { Button } from '../../Components/Buttons/Buttons'
import NewsCard from '../../Components/NewsCard/News'
import styles from './Newsletter.module.css'
import Header from '../../Layouts/Header/Header'
import Footer from '../../Layouts/Footer/Footer'
import axios from 'axios'

const Newsletter = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(screenWidth < 1024 ? 'small' : 'big');

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
        
    const [newsData , setNewsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:5000/read/news') ;
                setNewsData(response.data);
                console.log(newsData)
            } catch(error){
                console.error('Error fetching data: ', error)
            }
        };
    fetchData();
    }, []) ;

    return (
        <>
            <Header/>
            <div className={styles.Container}>
                <h1 className={styles.H1}>
                    Latest News
                </h1>
                <article className={styles.Newsletter}>
                {newsData.map((key , index) => (
                    <NewsCard 
                    key={key._id}
                    first={index === 0} 
                    title={key.title}
                    image={key.image}   
                    author={key.author}
                    date = {key.date}
                    />
                ))}
                </article>
                <div className={styles.btn}>
                    <Button text="Load more" size={width} color={"green"} subscribed={false}/>                
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Newsletter