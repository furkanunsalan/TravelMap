import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { CustomNavbar } from "../components/CustomNavbar.jsx";
import { PlaceContext } from "../store/place-context.jsx";
import Loading from "../components/Loading.jsx";
import { Helmet } from "react-helmet";
import CustomModal from "../components/CustomModal.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import Footer from "../components/Footer.jsx";
import "../styles/scrollbar.css";

function PlaceDetail() {
  const { "place-slug": placeSlug } = useParams();
  const [placeDetails, setPlaceDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    email: "",
    password: "",
    visitDate: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);

  const { getPlaceBySlug, editPlace, notFound } = useContext(PlaceContext);

  useEffect(() => {
    const place = getPlaceBySlug(placeSlug);
    if (place) {
      setPlaceDetails(place);
      setModalData((prev) => ({
        ...prev,
        visitDate: place.date
          ? parse(place.date, "dd-MM-yyyy", new Date())
          : null,
      }));
    }
  }, [placeSlug, getPlaceBySlug]);

  useEffect(() => {
    if (map.current || !placeDetails) return;

    const fetchMapData = async () => {
      try {
        const response = await fetch(
          `/api/map-tiler?lng=${placeDetails.longitude}&lat=${placeDetails.latitude}`
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        map.current = new maptilersdk.Map({
          container: mapContainer.current,
          style: data,
          center: [placeDetails.longitude, placeDetails.latitude],
          zoom: 15.5,
          pitch: 45,
          interactive: false,
        });
        map.current.on("load", () => {
          rotateCamera(0);
        });
        new maptilersdk.Marker({
          color:
            placeDetails.tag === "Food"
              ? "#F57F4F"
              : placeDetails.tag === "Travel"
              ? "#4A90E2"
              : placeDetails.tag === "Chill"
              ? "#B2D8B2"
              : placeDetails.tag === "Library"
              ? "#7a49a5"
              : "#000000",
        })
          .setLngLat([placeDetails.longitude, placeDetails.latitude])
          .addTo(map.current);

        function rotateCamera(timestamp) {
          if (map.current) {
            map.current.rotateTo((timestamp / 100) % 360, {
              duration: 0,
            });
            requestAnimationFrame(rotateCamera);
          }
        }
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchMapData();
  }, [placeDetails]);

  const toggleStatus = () => {
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalData),
      });
      const data = await response.json();

      if (response.ok) {
        const newStatus = placeDetails.status === "ToGo" ? "Gone" : "ToGo";
        const newDate =
          newStatus === "ToGo"
            ? ""
            : modalData.visitDate
            ? format(modalData.visitDate, "dd-MM-yyyy")
            : "";

        await editPlace({
          ...placeDetails,
          status: newStatus,
          date: newDate,
        });

        setPlaceDetails((prevDetails) => ({
          ...prevDetails,
          status: newStatus,
          date: newDate,
        }));

        setShowModal(false);
      } else {
        alert(data.error || "Authentication failed");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setModalData((prevData) => ({ ...prevData, visitDate: date }));
  };

  if (!placeDetails) {
    return <Loading variant={1} />;
  }

  return (
    <div className="h-screen overflow-auto">
      <Helmet>
        <title>{placeDetails.name} | Travel Map</title>
        <meta
          name="description"
          content={
            placeDetails.description ||
            "Explore diverse places of interest, from charming local spots to hidden gems. Discover detailed information, ratings, and reviews to help you find your next adventure."
          }
        />
        <meta name="keywords" content="React, Vite, Metadata" />
      </Helmet>
      <div className="mx-auto mt-32">
        <CustomNavbar />
        <div className="relative h-96 mt-32 md:mt-5 w-5/6 md:w-1/2 mx-auto">
          <div ref={mapContainer} className="w-full h-full rounded-2xl" />
        </div>
        <div className="text-center mt-5">
          {Array(placeDetails.rating)
            .fill(false)
            .map((_, index) => (
              <span
                key={index}
                className={`text-black text-lg ${
                  index < placeDetails.rating ? "inline-block" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
        </div>
        <h1 className="text-center text-xl font-bold">{placeDetails.name}</h1>
        {placeDetails.date ? (
          <p className="text-center">Visited on {placeDetails.date}</p>
        ) : (
          <p className="text-center">Haven't visited yet</p>
        )}
        <div className="text-center mt-5 w-5/6 md:w-2/3 mx-auto">
          {placeDetails.description && (
            <p className="px-4 py-2 border border-gray-300 rounded-lg shadow-md bg-white mb-4">
              {placeDetails.description}
            </p>
          )}
          <div className="flex justify-center gap-4">
            <a
              href={`https://www.google.com/maps?q=${placeDetails.latitude},${placeDetails.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              View on Google Maps
            </a>
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
            <button
              onClick={toggleStatus}
              className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition"
            >
              Toggle Status
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {showModal && (
        <CustomModal
          email={modalData.email}
          password={modalData.password}
          visitDate={modalData.visitDate}
          onChange={handleModalChange}
          onDateChange={handleDateChange}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
          isToGo={placeDetails.status === "ToGo"}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default PlaceDetail;
