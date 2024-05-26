import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function Map() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer} onClick={()=> navigate("form")}>
            <h1>Map</h1>
            <h1>
                Position: {lat}, {lng}
            </h1>
            <button onClick={() => setSearchParams({lat: "40.7128", lng: "-74.0060"})}>
                Change Position
            </button>

        </div>
        );
}

export default Map;
