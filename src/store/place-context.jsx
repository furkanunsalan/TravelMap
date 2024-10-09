import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const PlaceContext = createContext({
    places: [],
    getPlaceBySlug: () => {}, // Method to get a place by slug
    addPlace: () => {}, // Method to add a new place
    editPlace: () => {}, // Method to edit an existing place
    loading: false, // Add loading state to context
    notFound: false, // Add notFound state to context
});

// Context provider component
export default function PlaceContextProvider({ children }) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [notFound, setNotFound] = useState(false); // Add notFound state

    // Fetch places from the backend
    const fetchPlaces = async () => {
        try {
            const response = await axios.get("/api/fetch-places"); // Adjust the URL to your serverless function endpoint
            if (response.data && Array.isArray(response.data.places)) {
                setPlaces(response.data.places);
                setNotFound(false); // Reset notFound state on successful fetch
            } else {
                console.error("Unexpected data format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching places:", error);
        } finally {
            setLoading(false); // Set loading to false when data fetching is complete
        }
    };

    // Fetch places on component mount
    useEffect(() => {
        fetchPlaces();
    }, []);

    // Method to get a place by slug
    const getPlaceBySlug = (slug) => {
        const place = places.find((place) => place.slug === slug);
        if (!place) {
            setNotFound(true); // Update notFound state if place is not found
        } else {
            setNotFound(false); // Reset notFound state if place is found
        }
        return place;
    };

    // Method to add a new place
    const addPlace = async (newPlace) => {
        try {
            const response = await axios.post("/api/add-place", newPlace); // Adjust the URL to your serverless function endpoint
            if (response.status === 200) {
                setPlaces((prevPlaces) => [...prevPlaces, response.data]);
            }
        } catch (error) {
            console.error("Error adding place:", error);
        }
    };

    // Method to edit an existing place (no dynamic slug)
    const editPlace = async (updatedPlace) => {
        try {
            const response = await axios.put("/api/edit-place", updatedPlace); // Edit place using a fixed endpoint
            if (response.status === 200) {
                setPlaces((prevPlaces) =>
                    prevPlaces.map((place) =>
                        place.slug === updatedPlace.slug ? response.data : place
                    )
                );
            }
        } catch (error) {
            console.error("Error editing place:", error);
        }
    };

    const ctxValue = {
        places,
        getPlaceBySlug, // Provide the method in context
        addPlace, // Provide the addPlace method in context
        editPlace, // Provide the editPlace method in context
        loading, // Provide the loading state in context
        notFound, // Provide the notFound state in context
    };

    return (
        <PlaceContext.Provider value={ctxValue}>
            {children}
        </PlaceContext.Provider>
    );
}
