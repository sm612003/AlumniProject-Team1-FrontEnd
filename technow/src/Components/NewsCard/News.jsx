import styles from "./News.module.css"

const NewsCard = ({title , image , auther , date , first}) => {
    const firstt = first === true ? styles.SectionFirst : styles.Section ;  
    return(
        <section className={firstt}>
            <h2 className={styles.H2}>{title}</h2>
            <figure className={styles.Figure}>
                <img src={`http://localhost:5000/${image}`} alt="newscard img" className={styles.Img}/>
                <caption className={styles.Caption}>{auther}{date}</caption>
            </figure>                
        </section>
    )
}
export default NewsCard ;