import Map from "../components/Map.jsx";
import { CustomNavbar } from "../components/CustomNavbar.jsx";
import { Helmet } from "react-helmet";

function Homepage() {
    return (
        <>
            <Helmet>
                <title>Furkan's Travel List</title>
                <meta
                    name="description"
                    content="All of your favorite places, in one map for you."
                />
                <meta name="keywords" content="React, Vite, Metadata" />
            </Helmet>
            <div className="h-screen overflow-hidden font-sans antialiased">
                <div className="flex h-full">
                    <div className="flex-1 relative bg-white">
                        <CustomNavbar />
                        <Map />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;
