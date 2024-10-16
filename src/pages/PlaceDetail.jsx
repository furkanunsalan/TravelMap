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
import {
  FaCheckCircle,
  FaMapMarked,
  FaLink,
  FaCalendar,
  FaEdit,
} from "react-icons/fa"; // Example icon, replace with your icon import
import { motion } from "framer-motion";
import CustomEditModal from "../components/CustomEditModal.jsx";

function PlaceDetail() {
  const { "place-slug": placeSlug } = useParams();
  const [placeDetails, setPlaceDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const handleEditSubmit = async (updatedDetails) => {
    try {
      await editPlace(updatedDetails); // Edit place through context
      setPlaceDetails(updatedDetails); // Update local state with new details
      setShowEditModal(false); // Close the edit modal after submission
    } catch (error) {
      console.error("Error editing place:", error);
    }
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

  const handleEditModalClose = () => {
    setShowEditModal(false);
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

  const isGone = placeDetails.status === "Gone"; // Determine if status is "gone"

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
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-800 m-auto mt-32 mb-6 md:mt-32 md:mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {placeDetails.name}
        </motion.h1>

        <motion.div
          className="relative h-96 mt-8 md:mt-5 w-5/6 xl:w-1/2 mx-auto rounded-2xl shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div ref={mapContainer} className="w-full h-full rounded-2xl" />
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mt-4 w-5/6 xl:w-1/2 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {placeDetails.date ? (
            <div className="flex items-center mb-2 lg:mb-0">
              <FaCalendar className="mr-2 text-gray-600" />
              <p className="text-center text-gray-700">{placeDetails.date}</p>
            </div>
          ) : (
            <p className="text-center text-gray-700 mb-2 lg:mb-0">
              Haven't visited yet
            </p>
          )}

          <div className="flex items-center space-x-4 flex-wrap">
            <a
              href={`https://www.google.com/maps?q=${placeDetails.latitude},${placeDetails.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              <FaMapMarked className="inline-block" />
            </a>
            {placeDetails.site && (
              <a
                href={placeDetails.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                <FaLink className="inline-block" />
              </a>
            )}
            <button
              onClick={() => setShowEditModal(true)} // Open edit modal
              className="inline-block px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              <FaEdit className="inline-block" />
            </button>
            <button
              onClick={toggleStatus}
              className={`inline-block px-4 py-2 text-white font-semibold rounded-lg shadow-md transition ${
                isGone
                  ? "bg-green-600 hover:bg-green-800"
                  : "bg-gray-600 hover:bg-gray-800"
              }`}
            >
              <FaCheckCircle className="inline-block" />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8 w-5/6 xl:w-1/2 mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {placeDetails.description && (
            <div className="px-4 py-2 border border-gray-300 rounded-lg shadow-md bg-white mb-4">
              <div className="flex justify-center md:justify-start mb-2">
                {Array(placeDetails.rating)
                  .fill(false)
                  .map((_, index) => (
                    <span
                      key={index}
                      className={`text-black text-lg ${
                        index < placeDetails.rating
                          ? "inline-block"
                          : "text-gray-300"
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
              </div>
              <p className="text-left">{placeDetails.description}</p>
            </div>
          )}
        </motion.div>
        {/* New section for images */}
        <motion.div
          className="mt-8 w-5/6 xl:w-1/2 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {placeDetails.coverImageUrl && (
              <img
                src={placeDetails.coverImageUrl}
                alt="Cover"
                className="w-full h-auto rounded-lg shadow-md transition-transform duration-700 hover:scale-105"
              />
            )}
            {placeDetails.additionalImageUrls &&
              placeDetails.additionalImageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Additional ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md transition-transform duration-700 hover:scale-105"
                />
              ))}
          </div>
        </motion.div>
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
      {showEditModal && (
        <CustomEditModal
          placeDetails={placeDetails}
          onClose={handleEditModalClose}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}

export default PlaceDetail;
