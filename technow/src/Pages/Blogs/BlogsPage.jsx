import styles from "./BlogsPage.module.css"
import BlogCard from '../../Components/BlogCard/BlogCard'
import { useState , useEffect } from "react"
import axios from 'axios'
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton"
import { Button } from "../../Components/Buttons/Buttons"
import { Link } from "react-router-dom"

const BlogCardLayout =() => {
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


    const [blogData , setBlogData] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:5000/read/blogs')
                setBlogData(response.data)
            }catch(error){
                console.log("error");
            }
        }
        fetchData();
    }, [])

    return(
        <>
            <div className={styles.main}>
                <header className={styles.header}>
                    <h1 className={styles.h1}>Blogs</h1>
                    <p className={styles.pheader}>Blog your news</p>
                    <Link to='/blogsForm' className={styles.Link}>
                    <Button color={"green"} text={"Add Blog"} size={width} subscribed={false}/>
                    </Link>
                        {blogData.map((key , index) => (
                            <BlogCard 
                            key={key._id}
                            title={key.title}
                            author={key.author}
                            image={key.image}
                            createdAt={key.createdAt}
                            reversed={(index % 2 === 0)}
                            id={key._id}
                            />
                        ))}
                </header>
                <div className={styles.btn}>
                    <Button color={"green"} text={"Load more"} size={width} subscribed={false}/>
                </div>
            </div>
            <ScrollButton/>          
        </>
    );
}

export default BlogCardLayout