import styles from "./CountryItem.module.css";
import { Country } from "./CountryList";

type CountryItemProps = {
    country: Country;
    key: string;
}

function CountryItem({ country } : CountryItemProps ) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
