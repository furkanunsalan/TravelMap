import { Outlet, useNavigate } from "react-router-dom";
import { CustomNavbar } from "../components/CustomNavbar.jsx";
import '../styles/places.css';
import { TabsNav } from "../components/TabsNav.jsx";
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

function Places() {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Places</title>
                <meta name="description" content="All of your favorite places, in one place." />
                <meta name="keywords" content="React, Vite, Metadata" />
            </Helmet>

            {/* Animated Heading */}
            <motion.h1
                className="text-3xl md:text-4xl font-bold text-gray-800 m-auto mt-32 md:mt-12 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                All the places in my lists
            </motion.h1>

            {/* Animated Tabs Container */}
            <motion.div
                className="w-5/6 m-auto p-2 md:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <TabsNav />
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
        </>
    );
}

export default Places;
