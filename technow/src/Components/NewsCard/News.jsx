import styles from "./News.module.css"

const NewsCard = ({title , image , caption ,alt , first}) => {
    const firstt = first === true ? styles.SectionFirst : styles.Section ;  
    return(
        <section className={firstt}>
            <h2 className={styles.H2}>{title}</h2>
            <figure className={styles.Figure}>
                <img src={image} alt={alt} className={styles.Img}/>
                <caption className={styles.Caption}>{caption}</caption>
            </figure>                
        </section>
    )
}
export default NewsCard ;