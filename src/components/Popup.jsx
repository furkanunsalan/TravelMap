import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CustomButton from './CustomButton';
import { Button } from '@material-tailwind/react';

const Popup = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    // Close the popup
    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        <>
            {showPopup && (
                <motion.div
                    className="fixed bottom-4 right-4 bg-white shadow-lg border border-gray-300 rounded-lg p-4 max-w-xs w-full z-50"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}   
                    transition={{ duration: 0.4 }} 
                >
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold mb-2">Did you like this project?</h2>
                            <p className="text-sm text-gray-600">
                                Check out other projects and the code on GitHub!
                            </p>
                            <a 
                                href="https://github.com/furkanunsalan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 text-blue-500 hover:underline"
                            >
                                <Button size='sm' variant='filled' >My Github</Button>
                            </a>
                        </div>
                        {/* Close Button */}
                        <button 
                            onClick={handleClose} 
                            className="text-gray-500 hover:text-gray-800 ml-4"
                        >
                            ✕
                        </button>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default Popup;
