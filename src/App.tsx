import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CountryList from "./components/CountryList.tsx";
import CityList from "./components/CityList";
import City from "./components/City.tsx";
import Form from "./components/Form.tsx";
import { CitiesProvider } from "./context/CitiesContext.tsx";


function App() {

    return (
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage/>}/>
                    <Route path="product" element={<Product/>}/>
                    <Route path="pricing" element={<Pricing/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                    <Route path="app" element={<AppLayout/>}>
                        <Route
                            index
                            element={<Navigate replace to="cities"/>}
                        />
                        <Route
                            path="cities"
                            element={<CityList />}
                        />
                        <Route path="cities/:id" element={<City/>}/>
                        <Route path="countries" element={<CountryList />}/>
                        <Route path="form" element={<Form/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    );
}

export default App;
