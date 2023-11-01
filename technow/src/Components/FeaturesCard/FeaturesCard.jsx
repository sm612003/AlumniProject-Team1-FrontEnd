import styles from './FeaturesCard.module.css'

export const FeatureCard = () =>{
    const title = "Kill The Spam "
    const content = "Use Newsletter email to subscribe to newsletters. Win the battle against spam. Earn more time for a joyful reading."
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