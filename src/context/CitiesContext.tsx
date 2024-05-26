import React, { createContext, useContext, useEffect, useState } from 'react';
import { City } from "../components/CityList.tsx";

interface CitiesContext {
    cities: City[];
    isLoading: boolean;
}

const CitiesContext = createContext<CitiesContext>()
const BASE_URL = "http://localhost:8000";


function CitiesProvider({children} : {children: React.ReactNode}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert("There was an error loading data...");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={{cities, isLoading}}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside of the CitiesProvider");
    return context;
}

export {CitiesProvider, useCities}