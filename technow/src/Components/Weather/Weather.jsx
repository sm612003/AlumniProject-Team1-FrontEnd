import { useState, useEffect } from "react";
import styles from './Weather.module.css';
import { icons } from "../WeatherIcons/WeatherIcons";

export const Weather = () => {
    const api = "c6bf930472b9db1ac793515651057fe8";
    const base_URL = `http://api.openweathermap.org/data/2.5/forecast?q=Beirut&cnt=8&units=metric&appid=${api}`;

    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [temp, setTemp] = useState("0");
    const [id, setId] = useState(null);
    const [desc, setDesc] = useState("");

    useEffect(() => {
        fetch(base_URL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                if (data.cod === "200") {
                    setWeatherData(data);
                }
            })
            .catch((err) => {
                if (err.message === "Network request failed") {
                    setNetworkError(true);
                } else {
                    setError(true);
                }
            });
    }, [base_URL]);

    useEffect(() => {
        if (weatherData) {
            const { main, weather: weatherinfo } = weatherData.list[0]; // Access data.list[0]
            setTemp(main.temp);
            setId(weatherinfo[0].id);
            setDesc(weatherinfo[0].description) ;
        }
    }, [weatherData]);

    if (networkError) {
        return <div>Network error. Please check your internet connection.</div>;
    }

    if (error) {
        return <div>An error occurred while fetching weather data.{error}</div>;
    }

    return (
        <div className={styles.container}>
            <img src={icons(id)} alt="weather icon" className={styles.icon}/>
            <div className={styles.desc}>
                <p className={styles.p}>{Math.floor(temp)}&deg;C </p>
                <p className={styles.p}><span>{desc}</span></p>
                </div>
        </div>
    );
};
