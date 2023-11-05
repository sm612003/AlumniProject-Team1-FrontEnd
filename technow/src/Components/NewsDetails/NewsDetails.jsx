import { ScrollButton } from '../ScrollButton/ScrollButton'
import styles from './NewsDetails.module.css'

// Component
const NewsDetails = ({title , author , date , image , desc , sub , subDesc , links}) => {
    const formatDate = (date) => {
        const dateOnly = date.split('T')[0];
        const [year, month, day] = dateOnly.split('-');
        return `${day}-${month}-${year}`;
    }
    return(
        <div className={styles.Container}>
            <div className={styles.Title}>
                <h1 className={styles.H1}>
                    {title}
                </h1>
                <p className={styles.Caption}>
                    {author}/ {formatDate(date)}
                </p>
            </div>
            <div className={styles.Desc}>
                <img src={`http://localhost:5000/${image}`} alt={"img"} className={styles.Img}/>
                <p className={styles.P}>
                    {desc}
                </p>
            </div>
            <div className={styles.SubDesc}>
                <h2 className={styles.H2}>
                    {sub}
                </h2>
                <p className={styles.P}>
                    {subDesc}
                </p>
            </div>
            <div className={styles.Links}>
                <h2 className={styles.H2} >
                    Additional Links
                </h2>
                <p className={styles.P}>{links}</p>
                    <ScrollButton />
            </div>
        </div>
    )
}

export default NewsDetails