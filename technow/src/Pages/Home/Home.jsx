import styles from "./Home.module.css";
import { HeroSection } from "../../Layouts/HeroSection/Hero.jsx";
import { FeaturesSection } from "../../Layouts/Features/Features.jsx";
import { Subscribe } from "../../Layouts/SubscribeSection/Subscribe.jsx";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Helmet } from "react-helmet";
const HomePage = () => {
  return (
    <div className={styles.Container}>
       <Helmet>
        <title>TechNow</title>
        <meta name="description" content="Join our tech community and stay updated with the latest news in the world of technology. TechNow E-newsletter - Your source for tech insights and community engagement." />
      </Helmet>
      <HeroSection />
      <FeaturesSection />
      <Subscribe />
      <ScrollButton />
    </div>
  );
};

export default HomePage;
