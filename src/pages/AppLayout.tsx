import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import User from "../components/User.tsx";

function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar/>
            <Map/>
            <User/>
        </div>
    );
}

export default AppLayout;
