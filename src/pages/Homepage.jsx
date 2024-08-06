import Map from '../components/Map.jsx';
import '../styles/App.css';
import Sidebar from "../components/Sidebar.jsx";
import {CustomNavbar} from "../components/CustomNavbar.jsx";

function Homepage() {
    return (
        <div className="App">
            <div className="main">
                <div className="map relative w-full h-full">
                    <CustomNavbar />
                    <Map/>
                </div>
                <div className="sidebar">
                    <Sidebar/>
                </div>
            </div>
        </div>
    )
}

export default Homepage