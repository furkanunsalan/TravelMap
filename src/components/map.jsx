import ReactDOMServer from 'react-dom/server';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './css/map.css';
import { useEffect, useRef, useState } from "react";
import { toGo, chillPlaces, istanbulBurgerList } from '../places.jsx';
import CustomPopup from "./CustomPopup.jsx";

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const ist = { lng: 28.974969, lat: 41.086325 };
    const [zoom] = useState(10);

    useEffect(() => {
        if (map.current) return; // stops map from initializing more than once

        const fetchMapData = async () => {
            try {
                const response = await fetch(`/api/map-tiler?lng=${ist.lng}&lat=${ist.lat}&zoom=${zoom}`);

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();

                map.current = new maptilersdk.Map({
                    container: mapContainer.current,
                    style: data, // Assuming 'data' contains the style JSON directly
                    center: [ist.lng, ist.lat],
                    zoom: zoom
                });

                const allPlaces = [...toGo, ...istanbulBurgerList, ...chillPlaces]

                allPlaces.map(place => {
                    const latitude = parseFloat(place.latitude);
                    const longitude = parseFloat(place.longtitude);

                    const popupContent = ReactDOMServer.renderToString(
                        <CustomPopup
                            name={place.name}
                            address={place.address}
                            date={place.date}
                            rating={place.rating}
                            tag={place.tag}
                        />
                    );

                    new maptilersdk.Marker({
                        color: place.tag === 'Burger' ? "#F57F4F" : place.tag === 'ToGo' ? "#4A90E2" : place.tag === 'Chill' ? "#B2D8B2" : "#000000"})
                        .setLngLat([longitude, latitude])
                        .addTo(map.current)
                        .setPopup(new maptilersdk.Popup().setHTML(popupContent))
                });
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        fetchMapData();
    }, [ist.lng, ist.lat, zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
