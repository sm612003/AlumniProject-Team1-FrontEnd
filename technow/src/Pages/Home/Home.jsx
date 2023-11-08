import styles from "./Home.module.css";
import { HeroSection } from "../../Layouts/HeroSection/Hero.jsx";
import { FeaturesSection } from "../../Layouts/Features/Features.jsx";
import { Subscribe } from "../../Layouts/SubscribeSection/Subscribe.jsx";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";

const HomePage = () => {
  return (
    <div className={styles.Container}>
      <HeroSection />
      <FeaturesSection />
      <Subscribe />
      <ScrollButton />
    </div>
  );
};

export default HomePage;
