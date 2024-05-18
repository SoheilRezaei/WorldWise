import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message"
import {City} from "./CityList"
import CountryItem from "./CountryItem.tsx";

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

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, {country: city.country, emoji: city.emoji}]
        else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} />
            ))}
            
        </ul>
    );
}
