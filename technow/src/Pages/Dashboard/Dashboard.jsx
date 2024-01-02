import { useEffect, useState, useContext } from "react";
import styles from "./Dashboard.module.css";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";

// import NewsUpdate from "../NewsUpdate/NewsUpdateForm";
import ManageUserTable from "../../Components/ManageUser/ManageUserTable";
import SideBar from "../../Layouts/sideBar/SideBar";
import UserDescriptionsChart from "../../Components/pieChart/userpie";
import LineChart from "../../Components/LineChart/LineChart";
import RecentNewsGrid from "../../Components/tablenews/tabelrecentNews";
import MostActiveUserChart from "../../Components/mostActiveUser/mostActiveuser";
const Overview = () => {
  return (
    <div className={styles.Dashboard}>
      <SideBar />
      <div className={styles.overview}>
        <ScrollButton />

        {/* LineChart takes full width */}
        <div className={styles.LineChart}>
          <LineChart />
        </div>

        {/* Container for MostActiveUserChart and UserDescriptionsChart */}
        <div className={styles.chartContainer}>
          <div className={styles.MostActiveUserChart}>
            <MostActiveUserChart />
          </div>
          <div className={styles.UserDescriptionsChart}>
            <UserDescriptionsChart />
          </div>
        </div>

        {/* RecentNewsGrid takes full width */}
        <div className={styles.RecentNewsGrid}>
          <RecentNewsGrid />
        </div>
      </div>
    </div>
  );
};

export default Overview;
