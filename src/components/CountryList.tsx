import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message"
import {City} from "./CityList"
import CountryItem from "./CountryItem.tsx";
import { useCities } from "../context/CitiesContext.tsx";

type CountriesListProps = {
    cities: City[];
    isLoading: boolean;
}

export type Country = {
    country: string;
    emoji: string;
}

export default function CountryList() {
    const {cities, isLoading}: CountriesListProps = useCities();
    if (isLoading) return <Spinner/>

    if (!cities.length)
        return (
            <Message message="Add your first country by clicking on a country on the map"/>
        );

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, {country: city.country, emoji: city.emoji}]
        else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country: Country) => (
                <CountryItem country={country} key={country.country} />
            ))}
            
        </ul>
    );
}
