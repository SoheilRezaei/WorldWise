import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { City, useCities } from "../context/CitiesContext.tsx";

type CityListProps = {
  cities: City[];
  isLoading: boolean;
};

export default function CityList() {
  const {cities, isLoading}: CityListProps = useCities()

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return (
      <Message message="Your City List is Empty! Add your first city by clicking on a city on the map." />
    );

  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
