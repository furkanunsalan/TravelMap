import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // or you can use fetch API

// Create the context
export const PlaceContext = createContext({
    places: [],
    getPlaceBySlug: () => {}, // Method to get a place by slug
});

// Context provider component
export default function PlaceContextProvider({ children }) {
    const [places, setPlaces] = useState([]);

    // Fetch places from Firebase
    const fetchPlaces = async () => {
        try {
            const response = await axios.get('/api/fetch-places'); // Adjust the URL to your serverless function endpoint
            if (response.data && Array.isArray(response.data.places)) {
                setPlaces(response.data.places);
            } else {
                console.error('Unexpected data format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    // Fetch places on component mount
    useEffect(() => {
        fetchPlaces();
    }, []);

    // Method to get a place by slug
    const getPlaceBySlug = (slug) => {
        return places.find(place => place.slug === slug);
    };

    const ctxValue = {
        places,
        getPlaceBySlug, // Provide the method in context
    };

    return (
        <PlaceContext.Provider value={ctxValue}>
            {children}
        </PlaceContext.Provider>
    );
}
