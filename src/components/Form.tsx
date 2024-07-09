// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState, FormEvent } from "react";
import styles from "./Form.module.css";
import Button from "./Button.tsx";
import BackButton from "./BackButton.tsx";
import { useURLPosition } from "../hooks/useURLPosition.ts";
import Message from "./Message.tsx";
import Spinner from "./Spinner.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext.tsx";
import { useNavigate } from "react-router-dom";

interface GeocodeResponse {
    city?: string;
    locality?: string;
    countryName: string;
    countryCode: string;
}

export function convertToEmoji(countryCode: string): string {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
    const [cityName, setCityName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const { lat, lng } = useURLPosition();
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>(new Date());
    const [notes, setNotes] = useState<string>("");
    const [emoji, setEmoji] = useState<string>("");
    const [geocodingError, setGeocodingError] = useState<string>("");
    const { createCity, isLoading } = useCities();

    const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

    useEffect(() => {
        if (!lat || !lng) return;
        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true);
                setGeocodingError("");
                const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data: GeocodeResponse = await response.json();
                if (!data.city && !data.locality) throw new Error("That doesn't seem to be a city!");

                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (error) {
                if (error instanceof Error) {
                    setGeocodingError(error.message);
                }
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, [lat, lng]);


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date: date.toISOString(), // Assuming createCity expects a string
            notes,
            position: { lat, lng },
            id: undefined // Assuming `id` is generated elsewhere or not needed
        };
        await createCity(newCity);
        navigate("/app/cities");
    }

    if (isLoadingGeocoding) {
        return <Spinner />;
    }

    if (!lat && !lng) {
        return <Message message="Please start by choosing a location on the map" />;
    }

    if (geocodingError) {
        return <Message message={geocodingError} />;
    }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
          {/* <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
          /> */}
          <DatePicker id="date" onChange={(date) => date && setDate(date)} selected={date}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
          />

      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
