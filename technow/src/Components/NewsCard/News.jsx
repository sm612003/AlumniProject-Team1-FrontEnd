import styles from "./News.module.css"
import { Link } from "react-router-dom";

const NewsCard = ({title , image , auther , date , first , id}) => {
    const firstt = first === true ? styles.SectionFirst : styles.Section ;
    const firstLink = first === true ? styles.FirstLink : "" ;  
    const time = new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", timeZone: "GMT"}) 

    return(
        <Link to={`/newsletterDetails/${id}`} className={`${styles.Link} ${firstLink}`}>
        <section className={firstt}>
            <figure className={styles.Figure}>
                <img src={`http://localhost:5000/${image}`} alt="newscard img" className={styles.Img}/>
            </figure>  
            <span>
                <p className={styles.Time}>{time}</p>           
                <h2 className={styles.H2}>{title}</h2>
            </span>   

        </section>
        </Link>
    )
}
export default NewsCard ;