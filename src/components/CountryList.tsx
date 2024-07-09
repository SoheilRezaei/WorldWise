import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message"
import CountryItem from "./CountryItem.tsx";
import { City, useCities } from "../context/CitiesContext.tsx";

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

    const countries : Country[] = cities.reduce((arr : Country[], city : City) => {
        const countryExists = arr.some((el: Country) => el.country === city.country);
        if (!countryExists) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        } else {
            return arr;
        }
    }, []);
    //     if (!arr.map((el : City) => el.country).includes(city.country))
    //         return [...arr, {country: city.country, emoji: city.emoji}]
    //     else return arr;
    // }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country: Country) => (
                <CountryItem country={country} key={country.country} />
            ))}
            
        </ul>
    );
}
