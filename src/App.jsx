import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Places from "./pages/Places.jsx";
import PlaceDetail from "./pages/PlaceDetail.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import PlaceContextProvider from "./store/place-context.jsx";
import SubmitPage from "./pages/SubmitPage.jsx";
import Popup from "./components/Popup.jsx";

function App() {
    return (
        <PlaceContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/landmarks" element={<Places />} />
                    <Route
                        path="/landmarks/:place-slug"
                        element={<PlaceDetail />}
                    />
                    <Route path="/submit" element={<SubmitPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
            <Popup />
        </PlaceContextProvider>
    );
}

export default App;
