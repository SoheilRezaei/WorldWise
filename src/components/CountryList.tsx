import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CityItem from "./CityItem";
import Message from "./Message"
import {City} from "./CityList"

type CountriesListProps = {
    cities: City[];
    isLoading: boolean;
}

export default function CountryList({cities, isLoading} : CountriesListProps) {
    if (isLoading) return <Spinner />
    
    if (!cities.length)
        return (
            <Message message="Add your first country by clicking on a country on the map" />
        );

    return (
        <ul className={styles.countryList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
            
        </ul>
    );
}
