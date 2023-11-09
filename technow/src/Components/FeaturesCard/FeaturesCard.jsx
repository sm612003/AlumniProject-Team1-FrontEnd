import styles from './FeaturesCard.module.css'

export const FeatureCard = ({title , content}) =>{
    return(
        <div className={styles.Container}>
            <h3 className={styles.H3}>
                {title}
            </h3>
            <p className={styles.P}>
                {content}
            </p>
        </div>
    )
}