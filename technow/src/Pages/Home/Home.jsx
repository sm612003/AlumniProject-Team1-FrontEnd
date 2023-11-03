import styles from './Home.module.css'
import {HeroSection} from '../../Layouts/HeroSection/Hero.jsx'
import {FeaturesSection} from '../../Layouts/Features/Features.jsx'
import {Subscribe} from '../../Layouts/SubscribeSection/Subscribe.jsx'
import Header from '../../Layouts/Header/Header'
import Footer from '../../Layouts/Footer/Footer'

const HomePage = () => {
    return(
        <div className={styles.Container}>
            <Header/>
            <HeroSection/>
            <FeaturesSection/>
            <Subscribe/>
            <Footer/>
        </div>
    )
}

export default HomePage ;