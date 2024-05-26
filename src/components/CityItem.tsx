import { City } from "./CityList";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

type CityItemProps = {
    city: City;
};

const formatDate = (date: string | number) =>
    new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

export default function CityItem({city}: CityItemProps) {
    const {cityname, date, emoji, id, position} = city;

    return (
        <li>
            <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityname}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}
