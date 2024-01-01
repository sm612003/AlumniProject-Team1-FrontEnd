import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import axios from 'axios'
const LineChart = () => {
    const [loginUser, setLoginUser] = useState([])
    const [subscribedUser, setSubscribedUser] = useState([])
    let currentMonth = (new Date()).getMonth();
    let prevSixMonth = (currentMonth > 6) ? (currentMonth - 6) : (11 - currentMonth)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    useEffect(() => {

        const fetching = async () => {
            const data1 = await axios.get('http://localhost:5000/getSubscribersMonthly')
            const data2 = await axios.get('http://localhost:5000/user/getMonthly')

            setSubscribedUser(data1.data.usersNumber)
            setLoginUser(data2.data.usersNumber)

            console.log(data1.data.usersNumber)
            console.log('login', data2.data.usersNumber)

        }

        fetching();
    }, [])
    return (
        <div>

                <Chart
                    className='LineChart'
                    type="line"
                    width='100%'
                    height='400px'
                    series={[
                        {
                            name: "Login user",
                            data: loginUser,
                            color: '#14B86E'
                        },
                        {
                            name: "subscribed user",
                            data: subscribedUser,
                            color: '#E32751'
                        }
                    ]}

                    options={{
                        dataLabels: {
                            enabled: true,
                            textAnchor: 'middle',
                        },
                        tooltip: {
                            followCursor: true
                        },
                        xaxis: {
                            categories: monthNames.splice(prevSixMonth + 1, currentMonth + 1)
                        },
                        title: {
                            text: 'Number of users during the last 6 months',
                            style: {
                                align: 'center',
                                fontSize: '24px',
                                color: '#263238',
                             
                            },

                        },
                        fill: {
                            type: 'pattern',
                            pattern: {
                                style: 'verticalLines',
                                width: 6,
                                height: 6,
                                strokeWidth: 2
                            }
                        }
                    }}

                />
            </div>
    )
}

export default LineChart
