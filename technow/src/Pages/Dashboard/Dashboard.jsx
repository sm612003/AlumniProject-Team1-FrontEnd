import styles from "./Dashboard.module.css";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Helmet } from "react-helmet";
import LazyLoad from 'react-lazyload';
import SideBar from '../../Layouts/sideBar/SideBar'
import UserDescriptionsChart from "../../Components/pieChart/userpie";
import LineChart from "../../Components/LineChart/LineChart";
import RecentNewsGrid from "../../Components/tablenews/tabelrecentNews";
import MostActiveUserChart from "../../Components/mostActiveUser/mostActiveuser";
const Overview = () => {
  return (
    <div className={styles.Dashboard}>
    <header>
      <SideBar />
    </header>
    <main className={styles.overview}>
      <ScrollButton />
      <Helmet>
        <title>Dashboard Overview</title>
        <meta name="description" content="Overview of your application's dashboard with charts and recent news." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Dashboard Overview",
              "description": "Overview of your application's dashboard with charts and recent news.",
              "url": "http://localhost:3000/dashboard/overview",
            }
          `}
        </script>
      </Helmet>

      <h1>Dashboard Overview</h1>

      <section className={styles.LineChart}>
      <LazyLoad height={200} offset={100}>
      <LineChart />
      </LazyLoad>
        
      </section>

      <section className={styles.chartContainer}>
        <div className={styles.MostActiveUserChart} aria-label="Most Active User Chart">
          <MostActiveUserChart />
        </div>
        <div className={styles.UserDescriptionsChart} aria-label="User Descriptions Chart">
        <LazyLoad height={200} offset={100}>
   <UserDescriptionsChart />
</LazyLoad>
        </div>
      </section>

      <section className={styles.RecentNewsGrid}>
        <RecentNewsGrid />
      </section>
    </main>
  </div>
);
};

export default Overview;