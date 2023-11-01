import styles from './Features.module.css'
import { FeatureCard } from '../../Components/FeaturesCard/FeaturesCard'
import img from '../../Assets/Email-amico.png'

export const FeaturesSection = () => {
    return(
        <div className={styles.Container}>
                <h2 className={styles.H2}>
                    Why Newsletter-App? How to enjoy your feed?    
                </h2>
            <div className={styles.Content}>
                <div className={styles.Left}>
                    <FeatureCard/>
                    <FeatureCard/>
                    <FeatureCard/>
                </div>
                <div className={styles.Center}>
                    <img src={img} alt="" className={styles.Img}/>
                </div>
                <div className={styles.Right}>
                    <FeatureCard/>
                    <FeatureCard/>
                    <FeatureCard/>
                </div>
            </div>
        </div>
    )
}