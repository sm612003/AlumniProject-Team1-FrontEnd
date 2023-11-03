import clear from "../../Assets/weather-icons/clear.svg"
import drizzle from "../../Assets/weather-icons/drizzle.svg";
import fog from "../../Assets/weather-icons/fog.svg";
import mostlycloudy from "../../Assets/weather-icons/mostlycloudy.svg";
import partlycloudy from "../../Assets/weather-icons/partlycloudy.svg";
import rain from "../../Assets/weather-icons/rain.svg";
import snow from "../../Assets/weather-icons/snow.svg";
import storm from "../../Assets/weather-icons/storm.svg";


export const icons = (id) => {
    switch(true) {
        case id < 300:
        return `${storm}`;
        break;
        case id <= 499:
        return `${drizzle}`;
        break;
        case id <= 599:
        return `${rain}`;
        break;
        case id <= 699:
        return `${snow}`;
        break;
        case id <= 799:
        return `${fog}`;
        break;
        case id == 800:
        return `${clear}`;
        break;
        case id == 801:
        return `${partlycloudy}`;
        break;
        case id <= 805:
        return `${mostlycloudy}`;
        break;
        default:;
    }
}