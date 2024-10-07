import { Outlet } from "react-router-dom";
import { CustomNavbar } from "../components/CustomNavbar.jsx";
import { PlaceTabs } from "../components/PlaceTabs.jsx";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Footer from "../components/Footer.jsx";
import "../styles/places.css";

function Places() {
    return (
        <>
            <Helmet>
                <title>Landmarks | Travel Map</title>
                <meta
                    name="description"
                    content="All of your favorite places, in one place."
                />
                <meta name="keywords" content="React, Vite, Metadata" />
            </Helmet>

            {/* Animated Heading */}
            <motion.h1
                className="text-3xl md:text-4xl font-bold text-gray-800 m-auto mt-32 mb-6 md:mt-32 md:mb-6 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                My Favorite Places
            </motion.h1>

            {/* Animated Tabs Container */}
            <motion.div
                className="w-5/6 m-auto p-2 md:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <PlaceTabs />
            </motion.div>

            <CustomNavbar />

            {/* Render Outlet with animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Outlet />
            </motion.div>

            <Footer />
        </>
    );
}

export default Places;
