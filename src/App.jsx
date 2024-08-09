import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from "./pages/Homepage.jsx";
import Places from "./pages/Places.jsx";
import PlaceDetail from "./pages/PlaceDetail.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";
import PlaceContextProvider from "./store/place-context.jsx";
import SubmitPage from "./pages/SubmitPage.jsx";

function App() {
    return (
        <PlaceContextProvider>
            <Router>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/places" element={<Places />} />
                        <Route path="/places/:place-slug" element={<PlaceDetail />} />
                        <Route path="/submit" element={<SubmitPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
            </Router>
        </PlaceContextProvider>
    );
}

export default App;
