import styles from './Features.module.css'
import { FeatureCard } from '../../Components/FeaturesCard/FeaturesCard'
import img from '../../Assets/Images/Email-amico.png'

export const FeaturesSection = () => {
    return(
        <div className={styles.Container}>
                <h2 className={styles.H2}>
                    Why Newsletter-App?   
                </h2>
            <div className={styles.Content}>
                <div className={styles.Center}>
                    <img src={img} alt="" className={styles.Img} loading="lazy"/>
                </div>
                <div className={styles.Left}>
                    <FeatureCard title={"Kill The Spam "} content={"Use Newsletter email to subscribe to newsletters. Earn more time for a joyful reading."}/>
                    <FeatureCard title={"Be part of our community"} content={"Join top experts for a chat on the topics and trends that m-atter to you."}/>
                    <FeatureCard title={"One-Click Unsubscribe"} content={"Don't like what you're reading? Remove the feed by one click and never see it again."}/>
                </div>
                <div className={styles.Right}>
                    <FeatureCard title={"Control Your Feed "} content={"Group newsletters into folders, create labels, quickly mark as read and update the appearance."}/>
                    <FeatureCard title={"Discover Newsletters "} content={"Browse through your interests and find the ultimate content. Inspire yourself!"}/>
                    <FeatureCard title={"Enjoy Newsletter "} content={"No ads and spam in this app. Take reading and sharing to the next level with Letterbox. "}/>
                </div>
            </div>
        </div>
    )
}