import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const PlaceCard = ({ place, index, placeVariants }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={placeVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-[300px] flex flex-col"
        >
            {/* Placeholder for image section */}
            <div className="bg-gray-200 h-[150px] w-full"></div>
            {/* Content section */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-bold">{place.name}</h3>
                <p className="text-sm text-gray-600">{place.address}</p>
                <p className="text-sm text-gray-600">{place.date}</p>
                <Button
                    onClick={() => navigate(`/places/${place.slug}`)}
                    className="mt-4 w-1/2 mx-auto hover:underline"
                >
                    View Details
                </Button>
            </div>
        </motion.div>
    );
};

export default PlaceCard;
