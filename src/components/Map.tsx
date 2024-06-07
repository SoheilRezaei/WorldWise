import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { useCities } from "../context/CitiesContext.tsx";

function Map() {
    const { cities } = useCities();

    const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0])
    const [searchParams] = useSearchParams()

    const mapLat : number = searchParams.get("lat");
    const mapLng : number = searchParams.get("lng");

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat,mapLng]);
    }, [mapLat, mapLng]);

    return (
        <div className={styles.mapContainer}>
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

function ChangeCenter({position}) {
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
