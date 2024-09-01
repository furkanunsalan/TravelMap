import React from 'react';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { motion } from 'framer-motion';
import Place from "./Place.jsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PlaceContext } from "../store/place-context.jsx";

export function TabsNav() {
    const navigate = useNavigate();
    const { places } = useContext(PlaceContext);

    const placesToGo = places.filter(place => place.status === 'ToGo');
    const placesGoneFood = places.filter(place => place.tag === 'Food' && place.status === "Gone");
    const placesGoneChill = places.filter(place => place.tag === 'Chill' && place.status === "Gone");
    const placesGoneTravel = places.filter(place => place.tag === 'Travel' && place.status === "Gone");

    const placeVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="p-5"> {/* Added padding for better spacing */}
            <Tabs value="to-go" className="w-full">
                <TabsHeader>
                    <Tab value="to-go">To Go</Tab>
                    <Tab value="gone">Gone</Tab>
                </TabsHeader>
                <TabsBody className="w-full">
                    <TabPanel
                        value="to-go"
                        className={`flex flex-col ${placesToGo.length > 0 ? 'overflow-auto h-[400px]' : 'h-auto'}`}
                    >
                        {placesToGo.length > 0 ? (
                            <>
                                <h1 className="text-center text-xl font-bold mb-4">Places I Plan to Visit</h1>
                                {placesToGo.map((place, index) => (
                                    <motion.div
                                        key={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={placeVariants}
                                        transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger the animation
                                    >
                                        <Place
                                            bookmarkName={place.name}
                                            address={place.address}
                                            date={place.date}
                                            onClick={() => navigate(`/places/${place.slug}`)}
                                        />
                                    </motion.div>
                                ))}
                            </>
                        ) : (
                            <p className="text-center text-lg font-semibold">No places to go at the moment.</p>
                        )}
                    </TabPanel>
                    <TabPanel
                        value="gone"
                        className={`flex flex-col ${placesGoneFood.length > 0 || placesGoneChill.length > 0 ? 'overflow-auto h-[400px]' : 'h-auto'}`}
                    >
                        {placesGoneFood.length > 0 && (
                            <>
                                <h1 className="text-center text-xl font-bold mb-4">Burger Places</h1>
                                {placesGoneFood.map((place, index) => (
                                    <motion.div
                                        key={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={placeVariants}
                                        transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger the animation
                                    >
                                        <Place
                                            bookmarkName={place.name}
                                            address={place.address}
                                            date={place.date}
                                            onClick={() => navigate(`/places/${place.slug}`)}
                                        />
                                    </motion.div>
                                ))}
                            </>
                        )}
                        {placesGoneChill.length > 0 && (
                            <>
                                <h1 className="text-center text-xl font-bold mt-4">Chill Places</h1>
                                {placesGoneChill.map((place, index) => (
                                    <motion.div
                                        key={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={placeVariants}
                                        transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger the animation
                                    >
                                        <Place
                                            bookmarkName={place.name}
                                            address={place.address}
                                            date={place.date}
                                            onClick={() => navigate(`/places/${place.slug}`)}
                                        />
                                    </motion.div>
                                ))}
                            </>
                        )}
                        {placesGoneTravel.length > 0 && (
                            <>
                                <h1 className="text-center text-xl font-bold mb-4">Burger Places</h1>
                                {placesGoneTravel.map((place, index) => (
                                    <motion.div
                                        key={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={placeVariants}
                                        transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger the animation
                                    >
                                        <Place
                                            bookmarkName={place.name}
                                            address={place.address}
                                            date={place.date}
                                            onClick={() => navigate(`/places/${place.slug}`)}
                                        />
                                    </motion.div>
                                ))}
                            </>
                        )}
                        {placesGoneFood.length === 0 && placesGoneChill.length === 0 && placesGoneTravel.length === 0 && (
                            <p className="text-center text-lg font-semibold mt-4">No places to display at the moment.</p>
                        )}
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    );
}
