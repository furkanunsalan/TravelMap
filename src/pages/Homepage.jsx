import Map from '../components/Map.jsx';
import Sidebar from "../components/Sidebar.jsx";
import { CustomNavbar } from "../components/CustomNavbar.jsx";
import { Helmet } from 'react-helmet';

function Homepage() {
    return (
        <>
            <Helmet>
                <title>Furkan's Travel List</title>
                <meta name="description" content="All of your favorite places, in one map for you." />
                <meta name="keywords" content="React, Vite, Metadata" />
            </Helmet>
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
        </>

    )
}

export default Homepage;
