import React from 'react';

const CustomButton = ({ onClick, children, className }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-gray-800 text-white p-2 rounded hover:bg-gray-600 transition duration-200 ${className}`}
        >
            {children}
        </button>
    );
};

export default CustomButton;
