import styles from "./Home.module.css";
import { HeroSection } from "../../Layouts/HeroSection/Hero.jsx";
import { FeaturesSection } from "../../Layouts/Features/Features.jsx";
import { Subscribe } from "../../Layouts/SubscribeSection/Subscribe.jsx";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import Toast from "../../Components/Toast/Toast";

const HomePage = () => {
  return (
    <div className={styles.Container}>
      <Toast />
      <HeroSection />
      <FeaturesSection />
      <Subscribe />
      <ScrollButton />
    </div>
  );
};

export default HomePage;
