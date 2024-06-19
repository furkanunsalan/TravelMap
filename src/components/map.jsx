import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './css/map.css';
import {useEffect, useRef, useState} from "react";
import {toGo} from '../places.jsx'
const api = import.meta.env.VITE_API_KEY;

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const ist = { lng: 28.974969, lat: 41.086325 };
    const [zoom] = useState(10);
    maptilersdk.config.apiKey = api;

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [ist.lng, ist.lat],
            zoom: zoom
        });

        toGo.map(place => {
            const latitude = parseFloat(place.latitude);
            const longitude = parseFloat(place.longtitude);
            new maptilersdk.Marker({ color: "#FF0000" })
                .setLngLat([longitude, latitude])
                .addTo(map.current);
        });
    }, [ist.lng, ist.lat, zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}