import {Navigate, useNavigate, useParams} from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import ReactDOMServer from "react-dom/server";
import { CustomNavbar } from "../components/CustomNavbar.jsx";
import { PlaceContext } from "../store/place-context.jsx";
import Loading from "../components/Loading.jsx";
import { Helmet } from 'react-helmet';

function PlaceDetail() {
    const { 'place-slug': placeSlug } = useParams();
    const [placeDetails, setPlaceDetails] = useState();
    // const [notFound, setNotFound] = useState(false); // State to track if place is not found
    const mapContainer = useRef(null);
    const map = useRef(null);

    const navigate = useNavigate()

    const { getPlaceBySlug, notFound} = useContext(PlaceContext);

    useEffect(() => {
        const place = getPlaceBySlug(placeSlug);
        if (place) {
            setPlaceDetails(place);
        } else {
            // setNotFound(true); // Set notFound state to true
            if (notFound) {
                navigate('/not-found')
            }
        }
    }, [placeSlug, getPlaceBySlug]);

    useEffect(() => {
        if (map.current || !placeDetails) return; // Stops map from initializing more than once or if placeDetails is not loaded

        const fetchMapData = async () => {
            try {
                const response = await fetch(`/api/map-tiler?lng=${placeDetails.longitude}&lat=${placeDetails.latitude}`);

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();

                map.current = new maptilersdk.Map({
                    container: mapContainer.current,
                    style: data,
                    center: [placeDetails.longitude, placeDetails.latitude],
                    zoom: 15.5,
                    pitch: 45,
                    interactive: false,
                    keyboard: false,
                    scrollZoom: false,
                    boxZoom: false,
                    dragRotate: false,
                    dragPan: false,
                    doubleClickZoom: false,
                    touchZoomRotate: false,
                    touchPitch: false,
                });

                map.current.on('load', () => {
                    rotateCamera(0);
                });

                new maptilersdk.Marker({
                    color: placeDetails.tag === 'Burger' ? "#F57F4F" : placeDetails.tag === 'ToGo' ? "#4A90E2" : placeDetails.tag === 'Chill' ? "#B2D8B2" : "#000000"})
                    .setLngLat([placeDetails.longitude, placeDetails.latitude])
                    .addTo(map.current)


                function rotateCamera(timestamp) {
                    if (map.current) {
                        map.current.rotateTo((timestamp / 100) % 360, { duration: 0 });
                        requestAnimationFrame(rotateCamera);
                    }
                }
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        fetchMapData();
    }, [placeDetails]);

    if (!placeDetails) {
        return <Loading/>;
    }

    return (
        <>
            <Helmet>
                <title>{placeDetails.name}</title>
                <meta name="description"
                      content={placeDetails.description ||
                          "Explore diverse places of interest, from charming local spots to hidden gems. Discover detailed information, ratings, and reviews to help you find your next adventure."}
                />
                <meta name="keywords" content="React, Vite, Metadata" />
            </Helmet>
            <div className="w-5/6 md:w-1/2 mx-auto mt-5">
                <CustomNavbar />
                <div className="relative h-96 mt-32 md:mt-5">
                    <div ref={mapContainer} className="w-full h-full rounded-2xl" />
                </div>
                <div className="text-center mt-5">
                    {Array(placeDetails.rating)
                        .fill(false)
                        .map((_, index) => (
                            <span
                                key={index}
                                className={`text-black text-lg ${index < placeDetails.rating ? 'inline-block' : 'text-gray-300'}`}
                            >
                                ★
                            </span>
                        ))}
                </div>
                <h1 className="text-center text-xl font-bold">{placeDetails.name}</h1>
                <p className="text-center">Visited on {placeDetails.date}</p>
                <div className="text-center mt-5 w-full md:w-2/3 mx-auto">

                    {
                        placeDetails.description &&
                        <p className="px-4 py-2 border border-gray-300 rounded-lg shadow-md bg-white mb-4">
                            {placeDetails.description}
                        </p>
                    }

                    <div className="flex justify-center gap-4">
                        {/* Google Maps Button */}
                        <a
                            href={`https://www.google.com/maps?q=${placeDetails.latitude},${placeDetails.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                        >
                            View on Google Maps
                        </a>

                        {/* Official Site Button */}
                        {placeDetails.site && (
                            <a
                                href={placeDetails.site}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                            >
                                Visit Official Site
                            </a>
                        )}
                    </div>
                </div>
            </div>
        ,</>

    );
}

export default PlaceDetail;
