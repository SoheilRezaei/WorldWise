import { City } from "./CityList";
import styles from "./CityItem.module.css";

type CityItemProps = {
  city: City;
  key: number;
};

const formatDate = (date: string | number) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city, key }: CityItemProps) {
  const { cityname, date, emoji } = city;

  return (
    <li className={styles.cityItem} id={String(key)}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityname}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}
