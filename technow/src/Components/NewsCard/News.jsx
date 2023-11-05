import styles from "./News.module.css"
import { Link } from "react-router-dom";

const NewsCard = ({title , image , auther , date , first , id}) => {
    const firstt = first === true ? styles.SectionFirst : styles.Section ;
    const firstLink = first === true ? styles.FirstLink : "" ;  
    const formatDate = (date) => {
        const dateOnly = date.split('T')[0];
        const [year, month, day] = dateOnly.split('-');
        return `${day}-${month}-${year}`;
    }

    return(
        <Link to={`/newsletterDetails/${id}`} className={`${styles.Link} ${firstLink}`}>
        <section className={firstt}>
            <h2 className={styles.H2}>{title}</h2>
            <figure className={styles.Figure}>
                <img src={`http://localhost:5000/${image}`} alt="newscard img" className={styles.Img}/>
                <caption className={styles.Caption}>{auther}{formatDate(date)}</caption>
            </figure>                
        </section>
        </Link>
    )
}
export default NewsCard ;