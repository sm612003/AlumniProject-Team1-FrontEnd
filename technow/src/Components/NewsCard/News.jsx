import styles from "./News.module.css"

const NewsCard = ({title , image , auther , date , first}) => {
    const firstt = first === true ? styles.SectionFirst : styles.Section ;  
    const formatDate = (date) => {
        const dateOnly = date.split('T')[0];
        const [year, month, day] = dateOnly.split('-');
        return `${day}-${month}-${year}`;
    }

    return(
        <section className={firstt}>
            <h2 className={styles.H2}>{title}</h2>
            <figure className={styles.Figure}>
                <img src={`http://localhost:5000/${image}`} alt="newscard img" className={styles.Img}/>
                <caption className={styles.Caption}>{auther}{formatDate(date)}</caption>
            </figure>                
        </section>
    )
}
export default NewsCard ;