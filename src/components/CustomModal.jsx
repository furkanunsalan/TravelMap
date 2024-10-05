import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomModal({
    email,
    password,
    visitDate,
    onChange,
    onDateChange,
    onSubmit,
    onClose,
    isToGo,
    isSubmitting,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordClick = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md overflow-auto">
                <h2 className="text-xl font-bold mb-4">Authenticate</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="border p-2 w-full rounded pr-12"
                            required
                        />
                        <button
                            type="button"
                            onClick={handleShowPasswordClick}
                            className="absolute top-2/3 right-2 transform -translate-y-1/2 px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {isToGo && (
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                htmlFor="visitDate"
                            >
                                Visit Date
                            </label>
                            <DatePicker
                                id="visitDate"
                                selected={visitDate}
                                onChange={onDateChange}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select date"
                                className="border p-2 w-full rounded"
                            />
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 rounded ${
                                isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gray-800 text-white hover:bg-gray-700"
                            }`}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className={`px-4 py-2 rounded ${
                                isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gray-300 text-black hover:bg-gray-500"
                            }`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomModal;
