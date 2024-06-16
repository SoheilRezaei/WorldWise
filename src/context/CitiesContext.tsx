import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { City } from "../components/CityList.tsx";

interface CitiesContext {
    cities: City[];
    isLoading: boolean;
    currentCity: City | null;
    getCity: (id: number) => void;
    createCity: (newCity: City) => void;
    deleteCity: (id: number) => void;
}

const CitiesContext = createContext<CitiesContext>()
const BASE_URL = "http://localhost:8000";

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ""
}

function reducer(state, action) {
    switch(action.type) {
        case "loading":
            return {...state, isLoading: true};
        case "cities/loaded":
            return {...state, isLoading: false, cities: action.payload};
        case "city/loaded":
            return {...state, isLoading: false, currentCity: action.payload};
        case "city/created":
            return {...state, isLoading: false, cities: [...state.cities, action.payload]};
        case "cities/deleted":
            return {...state, cities: state.cities.filter((city) => city.id !== action.payload)};
        case "rejected":
            return {...state, isLoading:false, error: action.payload};
        default:
            throw new Error("Unknown Action Type")
    }
}

function CitiesProvider({children}: { children: React.ReactNode }) {
    const [{cities, isLoading, currentCity}, dispatch] = useReducer(
        reducer,
        initialState
    )
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        async function fetchCities() {
            dispatch({type: "loading"});
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({type: "cities/loaded", payload: data})
            } catch {
                dispatch({
                    type: "rejected", payload: "There was an error loading cities..."
                });
            }
        }
            fetchCities();

    }, []);

    async function getCity(id: number) {
        dispatch({type: "loading"})
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({type: "city/loaded", payload: data})
        } catch {
            dispatch({
                type: "rejected", payload: "There was an error loading data..."
            });
        }

    }

    async function createCity(newCity) {
        dispatch({type: "loading"})
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            dispatch({type: "city/created", payload: data});
        } catch {
            dispatch({
                type: "rejected", payload: "There was an error creating city..."
            });
        }
    }

    async function deleteCity(id: number) {
        dispatch({type: "loading"})
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({type: "cities/deleted", payload: id})
        } catch {
            dispatch({
                type: "rejected", payload: "There was an error deleting city..."
            });
        }
    }

    return (
        <CitiesContext.Provider value={{cities, isLoading, currentCity, createCity, deleteCity, getCity}}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside of the CitiesProvider");
    return context;
}

export { CitiesProvider, useCities};