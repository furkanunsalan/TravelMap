import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import CustomPopup from "../components/CustomPopup.jsx";
import ReactDOMServer from "react-dom/server";
import {CustomNavbar} from "../components/CustomNavbar.jsx";

function PlaceDetail() {
    const location = useLocation();
    const item = location.state;

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; // stops map from initializing more than once

        const fetchMapData = async () => {
            try {
                // Debugging: log the item details
                console.log('Item details:', item);

                // Ensure the URL and parameters are correct
                const response = await fetch(`/api/map-tiler?lng=${item.longtitude}&lat=${item.latitude}`);

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Map style data:', data);

                // Initialize the map
                map.current = new maptilersdk.Map({
                    container: mapContainer.current,
                    style: data,
                    center: [item.longtitude, item.latitude],
                    zoom: 15.5,
                    pitch: 45,
                    interactive: false, // Disable all interactions
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

                const popupContent = ReactDOMServer.renderToString(
                    <CustomPopup
                        slug={item.slug}
                        name={item.name}
                        address={item.address}
                        date={item.date}
                        rating={item.rating}
                        tag={item.tag}
                    />
                );

                new maptilersdk.Marker({
                    color: item.tag === 'Burger' ? "#F57F4F" : item.tag === 'ToGo' ? "#4A90E2" : item.tag === 'Chill' ? "#B2D8B2" : "#000000"})
                    .setLngLat([item.longtitude, item.latitude])
                    .addTo(map.current)
                    .setPopup(new maptilersdk.Popup().setHTML(popupContent))


                function rotateCamera(timestamp) {
                    // Rotate the map around the place marker
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
    }, [item.longtitude, item.latitude]);

    return (
        <div>
            <CustomNavbar />
            <div className="relative w-1/2 h-96 mx-auto mt-5">
                <div ref={mapContainer} className="w-full h-full rounded-2xl" />
            </div>
            <h1 className="text-center text-xl font-bold mt-5">{item.name}</h1>
            <p className="text-center">Visited on {item.date}</p>
        </div>
    );
}

export default PlaceDetail;
