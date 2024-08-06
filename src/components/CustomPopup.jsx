// CustomPopup.jsx
import React from 'react';
import { FaHamburger, FaCouch, FaTasks } from 'react-icons/fa'; // Adjust import based on icons you want

const CustomPopup = ({ name, address, date, rating, tag }) => {
    const stars = Array(rating).fill(false).map((_, index) => index < rating);

    // Function to determine the icon based on the tag
    const getIcon = (tag) => {
        switch (tag) {
            case 'Burger':
                return <FaHamburger className="text-xl text-orange-500" />;
            case 'Chill':
                return <FaCouch className="text-xl text-brown-300" />;
            case 'ToGo':
                return <FaTasks className="text-xl text-blue-500" />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex items-center mb-2">
                {getIcon(tag)}
                <h3 className="text-lg font-semibold ml-2">{name}</h3>
            </div>
            <p className="text-sm mb-2">{address}</p>
            {
                tag === "ToGo" ?
                    <p className="text-xs mb-2">Looking Forward to Visiting</p> :
                    <p className="text-xs mb-2">Latest been there: {date}</p>
            }
            <div className="flex items-center">
                <span className="font-semibold mr-2">Rating:</span>
                <div className="flex">
                    {stars.map((filled, index) => (
                        <span key={index} className={`text-yellow-500 text-lg ${filled ? 'inline-block' : 'text-gray-300'}`}>
                            ★
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CustomPopup;
