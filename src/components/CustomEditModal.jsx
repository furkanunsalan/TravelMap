import React, { useState } from "react";

function CustomEditModal({ placeDetails, onClose, onSubmit }) {
  const [editedDetails, setEditedDetails] = useState(placeDetails);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedDetails); // Pass edited details to the parent
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-2">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl md:max-w-2xl lg:max-w-4xl overflow-y-auto max-h-[90vh]">
    <h2 className="text-2xl font-bold mb-6">Edit Place Details</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* E-Mail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-Mail
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="email"
              value={editedDetails.email || ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={editedDetails.password || ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-2 text-blue-600 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            disabled
            value={editedDetails.name}
            onChange={handleChange}
            className="border p-2 w-full rounded cursor-not-allowed"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={editedDetails.address}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Latitude */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude
          </label>
          <input
            type="number"
            name="latitude"
            value={editedDetails.latitude}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            step="any"
            required
          />
        </div>

        {/* Longitude */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude
          </label>
          <input
            type="number"
            name="longitude"
            value={editedDetails.longitude}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            step="any"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <input
            type="number"
            name="rating"
            value={editedDetails.rating}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            min="1"
            max="5"
            required
          />
        </div>

        {/* Visit Date (conditionally rendered) */}
        {editedDetails.status === "Gone" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visit Date
            </label>
            <input
              type="text"
              name="date"
              value={editedDetails.date}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
        )}

        {/* Description (spans two columns) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={editedDetails.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows="4"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>


  );
}

export default CustomEditModal;
