import React, { useState } from "react";

function CustomEditModal({ placeDetails, onClose, onSubmit }) {
  const [editedDetails, setEditedDetails] = useState(placeDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedDetails); // Pass edited details to the parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-auto">
        <h2 className="text-xl font-bold mb-4">Edit Place Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              disabled
              value={editedDetails.name}
              onChange={handleChange}
              className="border p-2 w-full rounded hover:cursor-not-allowed"
              required
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
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

          {/* Conditionally render date if status is "gone" */}
          {editedDetails.status === "Gone" && (
            <div className="mb-4">
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
