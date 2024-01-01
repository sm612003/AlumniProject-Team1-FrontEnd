// UserDescriptionsChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const UserDescriptionsChart = () => {
  const [userDescriptions, setUserDescriptions] = useState([]);

  useEffect(() => {
    // Fetch user descriptions from your backend API
    axios.get('http://localhost:5000/user/description')
      .then(response => {
        // Ensure response.data is an array before setting the state
        if (Array.isArray(response.data)) {
          setUserDescriptions(response.data);
        } else {
          console.error('Invalid data format received from the server:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching user descriptions:', error);
      });
  }, []);

  // Specify colors for each section of the pie chart
  const colors = ['#94DD8B', '#14B86E', '#2C6E49','#119C59', '#775DD0'];

  const options = {
    chart: {
      type: 'pie',
    },
    labels: userDescriptions,
    colors: colors,
  };

  const series = userDescriptions.map(() => 1); // Each description has a count of 1

  return (
    <div>
      <h2>User Descriptions</h2>
      {userDescriptions.length > 0 && (
        <ReactApexChart options={options} series={series} type="pie" height={200} />
      )}
    </div>
  );
};

export default UserDescriptionsChart;
