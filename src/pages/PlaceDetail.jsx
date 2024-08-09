import {Navigate, useNavigate, useParams} from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import CustomPopup from "../components/CustomPopup.jsx";
import ReactDOMServer from "react-dom/server";
import { CustomNavbar } from "../components/CustomNavbar.jsx";
import { PlaceContext } from "../store/place-context.jsx";
import Loading from "../components/Loading.jsx";

function PlaceDetail() {
    const { 'place-slug': placeSlug } = useParams();
    const [placeDetails, setPlaceDetails] = useState();
    // const [notFound, setNotFound] = useState(false); // State to track if place is not found
    const mapContainer = useRef(null);
    const map = useRef(null);

    const { getPlaceBySlug, notFound} = useContext(PlaceContext);

    useEffect(() => {
        const place = getPlaceBySlug(placeSlug);
        if (place) {
            setPlaceDetails(place);
        } else {
            // setNotFound(true); // Set notFound state to true
        }
    }, [placeSlug, getPlaceBySlug]);

    useEffect(() => {
        if (map.current || !placeDetails) return; // Stops map from initializing more than once or if placeDetails is not loaded

        const fetchMapData = async () => {
            try {
                const response = await fetch(`/api/map-tiler?lng=${placeDetails.longtitude}&lat=${placeDetails.latitude}`);

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();

                map.current = new maptilersdk.Map({
                    container: mapContainer.current,
                    style: data,
                    center: [placeDetails.longtitude, placeDetails.latitude],
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

                const popupContent = ReactDOMServer.renderToString(
                    <CustomPopup
                        slug={placeDetails.slug}
                        name={placeDetails.name}
                        address={placeDetails.address}
                        date={placeDetails.date}
                        rating={placeDetails.rating}
                        tag={placeDetails.tag}
                    />
                );

                new maptilersdk.Marker({
                    color: placeDetails.tag === 'Burger' ? "#F57F4F" : placeDetails.tag === 'ToGo' ? "#4A90E2" : placeDetails.tag === 'Chill' ? "#B2D8B2" : "#000000"})
                    .setLngLat([placeDetails.longtitude, placeDetails.latitude])
                    .addTo(map.current)
                    .setPopup(new maptilersdk.Popup().setHTML(popupContent));

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
        <div className="w-1/2 mx-auto mt-5">
            <CustomNavbar />
            <div className="relative h-96">
                <div ref={mapContainer} className="w-full h-full rounded-2xl" />
            </div>
            <h1 className="text-center text-xl font-bold mt-5">{placeDetails.name}</h1>
            <p className="text-center">Visited on {placeDetails.date}</p>
        </div>
    );
}

export default PlaceDetail;
