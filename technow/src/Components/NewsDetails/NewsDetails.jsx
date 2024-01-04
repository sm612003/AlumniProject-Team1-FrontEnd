import { ScrollButton } from '../ScrollButton/ScrollButton'
import styles from './NewsDetails.module.css'
import {Helmet} from 'react-helmet'
// Component
const NewsDetails = ({title , author , date , image , desc , sub , subDesc , link}) => {
    const time = new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", timeZone: "GMT"}) 
    return(
        <div className={styles.Container}>
             <Helmet>
                <title>{title}</title>
                <meta name="description" content="News about tech added by the admin of technow newsLetter" />
            </Helmet>
            <div className={styles.Title}>
                <h1 className={styles.H1}>
                    {title}
                </h1>
                <p className={styles.Caption}>
                    {author}/ {time}
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
                <a className={styles.P} href={`${link}`}>visit</a>
                    <ScrollButton />
            </div>
        </div>
    )
}

export default NewsDetails