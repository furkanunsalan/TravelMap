import React, { useState, useContext } from 'react';
import PlaceCard from "../components/PlaceCard.jsx";
import { PlaceContext } from "../store/place-context.jsx";

export function TabsNav() {
    const { places } = useContext(PlaceContext);

    const [activeTab, setActiveTab] = useState("to-go");

    const placesToGo = places.filter(place => place.status === 'ToGo');
    const placesGoneFood = places.filter(place => place.tag === 'Food' && place.status === "Gone");
    const placesGoneChill = places.filter(place => place.tag === 'Chill' && place.status === "Gone");
    const placesGoneTravel = places.filter(place => place.tag === 'Travel' && place.status === "Gone");
    const placesGoneLibrary = places.filter(place => place.tag === 'Library' && place.status === "Gone");

    const placeVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="p-5">
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`py-2 px-4 font-semibold rounded-lg transition-colors ${activeTab === "to-go" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                    onClick={() => setActiveTab("to-go")}
                >
                    To Go
                </button>
                <button
                    className={`py-2 px-4 font-semibold rounded-lg transition-colors ${activeTab === "gone" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                    onClick={() => setActiveTab("gone")}
                >
                    Gone
                </button>
            </div>

            <div className="w-full">
                {activeTab === "to-go" && (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {placesToGo.length > 0 ? (
                            <>
                                <h1 className="text-center text-xl font-bold mb-4 w-full">Places I Plan to Visit</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                                    {placesToGo.map((place, index) => (
                                        <PlaceCard 
                                            key={index}
                                            place={place}
                                            index={index}
                                            placeVariants={placeVariants}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-lg font-semibold w-full">No places to go at the moment.</p>
                        )}
                    </div>
                )}

                {activeTab === "gone" && (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {placesGoneFood.length > 0 && (
                            <>
                                <h1 className="text-center text-xl font-bold mb-4 w-full">Food</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                                    {placesGoneFood.map((place, index) => (
                                        <PlaceCard 
                                            key={index}
                                            place={place}
                                            index={index}
                                            placeVariants={placeVariants}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                        {placesGoneChill.length > 0 && (
                            <>
                                <h1 className="text-center text-xl font-bold mt-4 w-full">Chill & Hangout</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                                    {placesGoneChill.map((place, index) => (
                                        <PlaceCard 
                                            key={index}
                                            place={place}
                                            index={index}
                                            placeVariants={placeVariants}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                        {placesGoneTravel.length > 0 && (
                            <>
                                <h1 className="text-center text-xl font-bold mb-4 w-full">Travel List</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                                    {placesGoneTravel.map((place, index) => (
                                        <PlaceCard 
                                            key={index}
                                            place={place}
                                            index={index}
                                            placeVariants={placeVariants}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                        {placesGoneLibrary.length > 0 && (
                            <>
                                <h1 className="text-center text-xl font-bold mt-4 w-full">Libraries</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                                    {placesGoneLibrary.map((place, index) => (
                                        <PlaceCard 
                                            key={index}
                                            place={place}
                                            index={index}
                                            placeVariants={placeVariants}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                        {placesGoneFood.length === 0 && placesGoneChill.length === 0 && placesGoneTravel.length === 0 && placesGoneLibrary.length === 0 && (
                            <p className="text-center text-lg font-semibold mt-4 w-full">No places to display at the moment.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
