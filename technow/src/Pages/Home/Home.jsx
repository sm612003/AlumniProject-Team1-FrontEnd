import styles from './Home.module.css'
import {HeroSection} from '../../Layouts/HeroSection/Hero.jsx'
import {FeaturesSection} from '../../Layouts/Features/Features.jsx'
import {Subscribe} from '../../Layouts/SubscribeSection/Subscribe.jsx'

export const HomePage = () => {
    return(
        <div className={styles.Container}>
            <HeroSection/>
            <FeaturesSection/>
            <Subscribe/>
        </div>
    )
}