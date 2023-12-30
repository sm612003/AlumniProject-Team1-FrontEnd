// MostActiveUserChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const MostActiveUserChart = () => {
  const [mostActiveUsers, setMostActiveUsers] = useState([]);

  useEffect(() => {
    // Fetch the top 5 most active users from your backend API
    axios.get('http://localhost:5000/user/active')
      .then(response => {
        // Ensure response.data is an array before setting the state
        if (Array.isArray(response.data)) {
          setMostActiveUsers(response.data);
        } else {
          console.error('Invalid data format received from the server:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching most active users:', error);
      });
  }, []);

  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        verticale: true,
        colors: {
          ranges: [
            {
              from: 0,
              to: 2,
              color: '#94DD8B', // Color for users with 0-2 blogs
            },
            {
              from: 3,
              to: 5,
              color: '#14B86E', // Color for users with 3-5 blogs
            },
            {
              from: 6,
              to: 10,
              color: '#119C59', // Color for users with 6-10 blogs
            },
            {
              from: 11,
              to: 20,
              color: '#2C6E49', // Color for users with 11-20 blogs
            },
            {
              from: 21,
              to: 50,
              color: '#775DD0', // Color for users with 21-50 blogs
            },
          ],
        },
      },
    },
    xaxis: {
      categories: mostActiveUsers.map(user => `${user.firstName} ${user.lastName}`),
    },
  };

  const series = [{
    name: 'Number of Blogs',
    data: mostActiveUsers.map(user => user.blogs ? user.blogs.length : 0),
  }];

  return (
    <div>
      <h2>Most Active Users</h2>
      {mostActiveUsers.length > 0 && (
        <ReactApexChart options={options} series={series} type="bar" height={200} />
      )}
    </div>
  );
};

export default MostActiveUserChart;
