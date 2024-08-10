// Map.jsx
import React, { useEffect, useRef, useState, useContext } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import '../styles/map.css';
import { PlaceContext } from '../store/place-context.jsx';
import { useNavigate } from 'react-router-dom';

// Access the environment variable for MapTiler API key
const apiKey = import.meta.env.VITE_API_KEY;

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const ist = { lng: 28.974969, lat: 41.086325 };
    const [zoom] = useState(10);
    maptilersdk.config.apiKey = import.meta.env.VITE_API_KEY;
    const { places } = useContext(PlaceContext);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await fetch(`/api/map-tiler?lng=${ist.lng}&lat=${ist.lat}&zoom=${zoom}`);

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();

                // Initialize the map
                map.current = new maptilersdk.Map({
                    container: mapContainer.current,
                    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
                    center: [ist.lng, ist.lat],
                    zoom: zoom
                });

                // Add markers to the map
                places.forEach(place => {
                    const latitude = parseFloat(place.latitude);
                    const longitude = parseFloat(place.longitude);

                    if (!isNaN(latitude) && !isNaN(longitude)) {
                        // Create a custom HTML container for the popup
                        const popupDiv = document.createElement('div');
                        popupDiv.innerHTML = `
                            <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
                                <div class="flex items-center justify-center mb-2">
                                    ${place.tag === 'Burger' ? '<span class="text-xl text-orange-500">🍔</span>' : ''}
                                    ${place.tag === 'Chill' ? '<span class="text-xl text-brown-300">☕️</span>' : ''}
                                    ${place.tag === 'ToGo' ? '<span class="text-xl text-blue-500">📋</span>' : ''}
                                    <h3 class="text-lg font-semibold ml-2">${place.name}</h3>
                                </div>
                                <p class="text-sm mb-2">${place.address}</p>
                                ${place.tag === 'ToGo' ? '<p class="text-xs mb-2">Looking Forward to Visiting</p>' : `<p class="text-xs mb-2">Latest been there: ${place.date}</p>`}
                                <div class="flex items-center justify-center mb-2">
                                    <span class="font-semibold mr-2">Rating:</span>
                                    <div class="flex">
                                        ${Array(place.rating).fill(false).map((_, index) => `<span class="text-yellow-500 text-lg ${index < place.rating ? 'inline-block' : 'text-gray-300'}">★</span>`).join('')}
                                    </div>
                                </div>
                                <button
                                    class="mt-4 p-2 text-white rounded"
                                    style="cursor: pointer; display: block; margin: 1em auto 0; background-color: ${place.tag === 'Burger' ? '#F57F4F' : place.tag === 'Chill' ? '#B2D8B2' : place.tag === 'ToGo' ? '#4A90E2' : '#007BFF'};"
                                    onclick="window.location.href='/places/${place.slug}'"
                                >
                                    Details
                                </button>
                            </div>
                        `;


                        new maptilersdk.Marker({
                            color: place.tag === 'Burger' ? "#F57F4F" :
                                place.tag === 'ToGo' ? "#4A90E2" :
                                    place.tag === 'Chill' ? "#B2D8B2" : "#000000"
                        })
                            .setLngLat([longitude, latitude])
                            .addTo(map.current)
                            .setPopup(new maptilersdk.Popup().setDOMContent(popupDiv));
                    }
                });
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        fetchMapData();
    }, [ist.lng, ist.lat, zoom, places, navigate]); // Added navigate to dependencies

    return (
        <div className="relative w-full h-screen">
            <div ref={mapContainer} className="relative w-full h-full" />
        </div>
    );
}
