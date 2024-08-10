import Map from '../components/Map.jsx';
import Sidebar from "../components/Sidebar.jsx";
import { CustomNavbar } from "../components/CustomNavbar.jsx";

function Homepage() {
    return (
        <div className="h-screen overflow-hidden font-sans antialiased">
            <div className="flex h-full">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col w-1/4 h-full bg-white">
                    <Sidebar className="flex-1 overflow-y-auto" />
                </div>
                {/* Map */}
                <div className="flex-1 relative bg-white">
                    <CustomNavbar />
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default Homepage;
