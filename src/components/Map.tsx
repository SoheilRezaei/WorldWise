import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import { LatLngExpression } from "leaflet";

function Map() {
    const navigate = useNavigate();
    const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0])
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className={styles.mapContainer} onClick={()=> navigate("form")}>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                        OpenStreetMap</a> contributors'
                />
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
        );
}

export default Map;
