import styles from "./BlogDetails.module.css"

const BlogDetailsComponent = ({title , author , image , createdAt , content }) =>{
    const time = new Date(createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", timeZone: "GMT"}) 
    return(
        
        <div className={styles.blogdetails}>
            <div className={styles.top}>
                <h1 className={styles.h1}>{title}</h1>
                <p className={styles.p}>{author}/{time}</p>
            </div>
            <div className={styles.center}>
                
                <img className={styles.image} src={`${process.env.REACT_APP_API}/${image}`} alt="blog img" />
            </div>    
                <article className={styles.bottom}>
                    <p className={styles.blogcontent}>{content}
                    </p>
                         
                </article>
            
        </div>
    );
}
export default BlogDetailsComponent;