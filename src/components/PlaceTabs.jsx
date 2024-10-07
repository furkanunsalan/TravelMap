import React, { useState, useContext } from "react";
import PlaceCard from "./PlaceCard.jsx";
import { PlaceContext } from "../store/place-context.jsx";
import Loading from "./Loading.jsx";
import "../styles/scrollbar.css";

export function PlaceTabs() {
  const { places, loading } = useContext(PlaceContext);

  const [activeTab, setActiveTab] = useState("to-go");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const placesToGo = places.filter(
    (place) =>
      place.status === "ToGo" &&
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const placesGoneFood = places.filter(
    (place) =>
      place.tag === "Food" &&
      place.status === "Gone" &&
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const placesGoneChill = places.filter(
    (place) =>
      place.tag === "Chill" &&
      place.status === "Gone" &&
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const placesGoneTravel = places.filter(
    (place) =>
      place.tag === "Travel" &&
      place.status === "Gone" &&
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const placesGoneLibrary = places.filter(
    (place) =>
      place.tag === "Library" &&
      place.status === "Gone" &&
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const placeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <Loading variant={2}/>
  }

  const renderPlaceGrid = (places, title) =>
    places.length > 0 && (
      <>
        <h1 className="text-center text-2xl font-bold mb-6">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place, index) => (
            <PlaceCard
              key={index}
              place={place}
              index={index}
              placeVariants={placeVariants}
            />
          ))}
        </div>
      </>
    );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`py-2 px-4 font-semibold rounded-lg transition-colors ${
            activeTab === "to-go"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setActiveTab("to-go")}
        >
          To Go
        </button>
        <button
          className={`py-2 px-4 font-semibold rounded-lg transition-colors ${
            activeTab === "gone"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setActiveTab("gone")}
        >
          Gone
        </button>
      </div>

      {/* Search bar under tab switcher */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="w-full">
        {activeTab === "to-go" && (
          <div>
            {renderPlaceGrid(placesToGo, "My To-Go List")}
            {placesToGo.length === 0 && (
              <p className="text-center text-lg font-semibold mt-4">
                No places to display at the moment.
              </p>
            )}
          </div>
        )}

        {activeTab === "gone" && (
          <div>
            {renderPlaceGrid(placesGoneFood, "Food")}
            {renderPlaceGrid(placesGoneChill, "Chill & Hangout")}
            {renderPlaceGrid(placesGoneTravel, "Travel List")}
            {renderPlaceGrid(placesGoneLibrary, "Libraries")}
            {placesGoneFood.length === 0 &&
              placesGoneChill.length === 0 &&
              placesGoneTravel.length === 0 &&
              placesGoneLibrary.length === 0 && (
                <p className="text-center text-lg font-semibold mt-4">
                  No places to display at the moment.
                </p>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
