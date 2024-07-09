import styles from "./City.module.css";
import { Params, useParams } from "react-router-dom";
import { useCities } from "../context/CitiesContext.tsx";
import { useEffect } from "react";
import Spinner from "./Spinner.tsx";
import BackButton from "./BackButton.tsx";


const formatDate = (date: string | null): string => {
    if (!date) return ""; // Return an empty string or some default value if date is null
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));
};


function City() {
    const {id}: Params = useParams()
    const {getCity, currentCity, isLoading} = useCities()

    useEffect(function () {
        if (id != null) {
            getCity(id)
        }
    }, [id, getCity]);

    // const {cityName, emoji, date, notes} = currentCity;
    const cityName = currentCity?.cityName;
    const emoji = currentCity?.emoji;
    const date = currentCity?.date;
    const notes = currentCity?.notes;

    if (isLoading) return <Spinner/>;

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{emoji}</span> {cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date || null)}</p>
            </div>

            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <BackButton/>
            </div>
        </div>
    )

}

export default City;
