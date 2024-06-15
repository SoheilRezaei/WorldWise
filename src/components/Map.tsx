import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { useCities } from "../context/CitiesContext.tsx";
import { useGeolocation } from "../hooks/useGeoLocation.ts";
import Button from "./Button.tsx";
import { useURLPosition } from "../hooks/useURLPosition.ts";

function Map() {
    const { cities } = useCities();
    const {lat: mapLat, lng: mapLng}  = useURLPosition();
    const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0])
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();

    useEffect(() => {
        if (mapLat && mapLng) {
            const position : LatLngExpression = [mapLat, mapLng]
            setMapPosition(position);
        }
    }, [mapLat, mapLng]);

    useEffect(() => {
        if(geolocationPosition) setMapPosition(geolocationPosition);
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Your position"}
            </Button>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                        OpenStreetMap</a> contributors'
                />
                {cities.map((city) => (<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                        <span>{city.emoji}</span>
                        <span>{city.cityName}</span>
                    </Popup>
                </Marker>))}
                <ChangeCenter position={mapPosition}/>
                <DetectClick />
            </MapContainer>
        </div>
        );
}

function ChangeCenter({position} : {position: LatLngExpression}) {
    const map = useMap()
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
            click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        })
}

export default Map;
