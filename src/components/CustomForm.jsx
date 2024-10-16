import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlaceContext } from "../store/place-context.jsx";
import { formatDate } from "../../util/formatDate.js";
import { generateSlug } from "../../util/generateSlug.js";
import { motion } from "framer-motion";
import { data } from "autoprefixer";

function CustomForm() {
  const { addPlace } = useContext(PlaceContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rating: "",
    tag: "",
    latitude: "",
    longitude: "",
    site: "",
    description: "",
    status: "",
  });
  const [userType, setUserType] = useState("guest");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));
        },
        (error) => {
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedStatus = checked
          ? [...prevData[name], value]
          : prevData[name].filter((v) => v !== value);
        return { ...prevData, [name]: updatedStatus };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : "", // Handle single selection
    }));
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleDateChange = (date) => {
    if (userType === "admin") {
      setFormData((prevData) => ({
        ...prevData,
        date,
      }));
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Get the selected files
    setSelectedImages(files); // Store the files in the component’s state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = generateSlug(formData.name);
    const rating = parseInt(formData.rating, 10);

    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert("Rating must be an integer between 1 and 5");
      return;
    }

    // Prepare data to send
    const dataToSend = {
      ...formData,
      slug,
      rating,
      date: userType === "admin" ? formatDate(formData.date) : undefined, // Include date only for admin
    };

    // Assuming 'selectedImages' is an array of File objects captured from input[type="file"]
    const images = selectedImages;

    // Convert images to base64 or use a FormData approach if you're sending multipart form-data
    const imagePromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image); // Convert to base64
        reader.onloadend = () => resolve(reader.result.split(",")[1]); // Return base64 string without metadata part
        reader.onerror = reject;
      });
    });

    try {
      const base64Images = await Promise.all(imagePromises); // Convert all images to base64

      // Include images in dataToSend
      dataToSend.images = base64Images;

      // If user is admin, authenticate first, then submit
      if (userType === "admin") {
        const authResponse = await fetch("/api/authenticate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const authData = await authResponse.json();

        if (authResponse.ok) {
          const response = await addPlace(dataToSend); // Submit place with images

          if (response.ok) {
            alert("Place added successfully");
            navigate("/"); // Redirect to home page
            window.location.reload(); // Reload the page
          } else {
            setAuthError(response.error);
          }
        } else {
          setAuthError(authData.error);
        }
      } else {
        // For non-admin users, send data directly (including images)
        const response = await fetch("/api/addPlace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          alert("Place added successfully");
          navigate("/"); // Redirect to home page
          window.location.reload(); // Reload the page
        } else {
          alert("An error occurred while adding the place.");
        }
      }
    } catch (error) {
      console.error("Error adding place:", error);
      alert(
        "An error occurred while processing the images or submitting the form."
      );
    }

    // Clear form data after submission
    setFormData({
      name: "",
      address: "",
      rating: "",
      tag: "",
      latitude: "",
      longitude: "",
      site: "",
      description: "",
    });
    setSelectedImages([]); // Clear selected images
    setEmail("");
    setPassword("");
    setAuthError("");
  };

  const statusOptions = [
    { value: "Gone", label: "Gone" },
    { value: "ToGo", label: "ToGo" },
  ];

  const tagOptions = [
    { value: "Food", label: "Food" },
    { value: "Chill", label: "Chill" },
    { value: "Travel", label: "Travel" },
    { value: "Library", label: "Library" },
  ];

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-32 mb-10 md:mb-32 md:mt-32 p-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Submit a Place</h2>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Type Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <label className="mb-1 font-medium" htmlFor="userType">
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="border p-2 rounded hover:cursor-pointer"
            >
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
            </select>
          </motion.div>

          {userType === "admin" && (
            <>
              {/* Email Field */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label className="mb-1 font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label className="mb-1 font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              </motion.div>
            </>
          )}

          {/* Name Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <label className="mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </motion.div>

          {/* Address Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <label className="mb-1 font-medium" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </motion.div>

          {userType === "admin" && (
            <>
              {/* Status Field */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <label className="mb-1 font-medium" htmlFor="status">
                  Status
                </label>
                <Select
                  id="status"
                  name="status"
                  value={statusOptions.find(
                    (option) => option.value === formData.status
                  )}
                  onChange={handleSelectChange}
                  options={statusOptions}
                  className="basic-single-select w-full"
                  classNamePrefix="select"
                />
              </motion.div>

              {/* Date Field */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <label className="mb-1 font-medium" htmlFor="date">
                  Date
                </label>
                <DatePicker
                  id="date"
                  name="date"
                  selected={formData.date}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  className="border p-2 rounded w-full hover:cursor-pointer"
                  placeholderText="dd-mm-yyyy"
                  disabled={formData.status === "ToGo"}
                />
              </motion.div>
            </>
          )}

          {/* Tag Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >
            <label className="mb-1 font-medium" htmlFor="tag">
              Tag
            </label>
            <Select
              id="tag"
              name="tag"
              value={tagOptions.find((option) => option.value === formData.tag)}
              onChange={handleSelectChange}
              options={tagOptions}
              className="basic-single-select w-full"
              classNamePrefix="select"
            />
          </motion.div>

          {/* Latitude Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <label className="mb-1 font-medium" htmlFor="latitude">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </motion.div>

          {/* Longitude Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <label className="mb-1 font-medium" htmlFor="longitude">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </motion.div>

          <motion.button
            type="button"
            className="col-span-1 md:col-span-2 bg-gray-700 text-white p-2 rounded w-full hover:cursor-pointer hover:bg-[#212121]"
            onClick={handleGetLocation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            Get Current Location
          </motion.button>

          {/* Rating Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 1.1 }}
          >
            <label className="mb-1 font-medium" htmlFor="rating">
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="border p-2 rounded"
              min="1"
              max="5"
              step="1"
            />
          </motion.div>

          {/* Site Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <label className="mb-1 font-medium" htmlFor="site">
              Official Site
            </label>
            <input
              type="url"
              id="site"
              name="site"
              value={formData.site}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </motion.div>

          {/* Description Field */}
          <motion.div
            className="col-span-1 md:col-span-2 flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 1.3 }}
          >
            <label className="mb-1 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded"
              rows="4"
            />
          </motion.div>

          {/* Image Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <label className="mb-1 font-medium" htmlFor="site">
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="border p-2 w-full rounded-md"
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="w-20 h-20 overflow-hidden border rounded-md"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="bg-[#212121] text-white p-2 rounded w-full hover:cursor-pointer hover:bg-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.4 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default CustomForm;
