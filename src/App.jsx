import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from "./pages/Homepage.jsx";
import Places from "./pages/Places.jsx";
import PlaceDetail from "./pages/PlaceDetail.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";
import PlaceContextProvider from "./store/place-context.jsx";

function App() {
    return (
        <PlaceContextProvider>
            <Router>
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/places" element={<Places />} />
                        <Route path="/places/:place-slug" element={<PlaceDetail />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </ErrorBoundary>
            </Router>
        </PlaceContextProvider>
    );
}

export default App;
