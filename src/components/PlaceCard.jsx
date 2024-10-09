import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const PlaceCard = ({ place, index, placeVariants }) => {
    const navigate = useNavigate();
    
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={placeVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden w-full flex flex-col"
        >
            {/* Image Section: Display image if available, otherwise show placeholder */}
            <div className="h-[150px] w-full">
                {place.coverImageUrl ? (
                    <img
                        src={place.coverImageUrl}
                        alt={place.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                        <span className="text-gray-500">No Image Available</span>
                    </div>
                )}
            </div>

            {/* Content section */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-bold">{place.name}</h3>
                <p className="text-sm text-gray-600">{place.address}</p>
                <p className="text-sm text-gray-600">{place.date}</p>
                <Button
                    onClick={() => navigate(`/landmarks/${place.slug}`)}
                    className="mt-4 w-full sm:w-auto sm:mx-auto hover:bg-gray-800"
                >
                    View Details
                </Button>
            </div>
        </motion.div>
    );
};

export default PlaceCard;
