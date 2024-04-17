import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

export default function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h2>Homepage</h2>

      <Link to="/app">Go to app</Link>
    </div>
  );
}
