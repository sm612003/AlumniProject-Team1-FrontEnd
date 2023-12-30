import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const YourComponent = () => {
  const [pieChartData, setPieChartData] = useState({
    options: {
      colors: ["#4DA192", "#14EBBE"],
      chart: {
        id: "basic-pie",
      },
      labels: ['Regular Users', 'Subscribed Users'],
    },
    series: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/barchart');
        const data = response.data;

        console.log('Received Data:', data);

        // Update state with fetched data
        setPieChartData({
          ...pieChartData,
          series: [data.userCount, data.subscribedUserCount],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart options={pieChartData.options} series={pieChartData.series} type="donut" height={350} />
    </div>
  );
};

export default YourComponent;
