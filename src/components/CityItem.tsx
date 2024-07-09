import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { City, useCities } from "../context/CitiesContext.tsx";

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
    const {currentCity, deleteCity} = useCities();
    const {cityName, date, emoji, id, position} = city;

    function handleClick(e : React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        id && deleteCity(id);
    }

    return (
        <li>
            <Link className={`${styles.cityItem} ${
                id === currentCity?.id ? styles['cityItem--active'] : ""
            }`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    );
}
