import styles from "./BlogCard.module.css"
import { Link } from 'react-router-dom'

 const BlogCard = ({title  , author , image , createdAt , reversed , id})=>{
    const reverse = reversed === true ? styles.blogReverse : styles.blogNormal ;
    const reversedImg = reversed === true ? styles.ReversedImg : styles.normalImg ;

    const time = new Date(createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", timeZone: "GMT"}) 

    return(   
        
            <div className={`${styles.blogcontent} ${reverse}`}>
                <div className={`${styles.mainimage} ${reversedImg}`}>
                <Link to={`/blogDetails/${id}`} className={styles.link2}>
                    <img src={`${process.env.REACT_APP_API}/${image}`} className={styles.image} alt="Img for the blog"></img>
                </Link>
                </div>
                <div className={styles.maincontent}>
                    <p className={styles.pclass}>{author} / {time}</p>
                    <Link to={`/blogDetails/${id}`} className={styles.link}>
                    <h2 className={styles.h2}>{title}</h2>
                    </Link>
                </div>
            </div>
    );
}
export default BlogCard