import styles from "./BlogsPage.module.css"
import BlogCard from '../../Components/BlogCard/BlogCard'
//import Header from '../../Layouts/Header/Header'
import Footer from '../../Layouts/Footer/Footer'
//import Button from '../../Components/Buttons/Buttons'

import { useState , useEffect } from "react"
import axios from 'axios'

const BlogCardLayout =() => {
    const [blogData , setBlogData] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:5000/read/blogs')
                setBlogData(response.data)
                console.log(blogData)
            }catch(error){
                console.log("error");
            }
        }
        fetchData();
    }, [])

    return(
        <>
            <div className={styles.main}>
                {/* <Header/> */}
                <header className={styles.header}>
                    <h1 className={styles.h1}>Blogs</h1>
                    <p className={styles.pheader}>Blog your news</p>
                    {/* <Button/> */}
                        {blogData.map((key , index) => (
                            <BlogCard 
                            key={key._id}
                            title={key.title}
                            author={key.author}
                            image={key.image}
                            createdAt={key.createdAt}
                            reversed={(index % 2 == 0)}
                            />
                        ))}
                </header>
            </div>
            <Footer/>            
        </>
    );
}

export default BlogCardLayout