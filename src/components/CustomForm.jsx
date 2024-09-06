import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PlaceContext } from '../store/place-context.jsx';
import { formatDate } from "../../util/formatDate.js";
import { generateSlug } from "../../util/generateSlug.js";
import { motion } from 'framer-motion';

function CustomForm() {
    const { addPlace } = useContext(PlaceContext);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        rating: '',
        tag: '',
        latitude: '',
        longitude: '',
        site: '',
        description: ''
    });
    const [userType, setUserType] = useState('guest');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevData => {
                const updatedStatus = checked
                    ? [...prevData[name], value]
                    : prevData[name].filter(v => v !== value);
                return { ...prevData, [name]: updatedStatus };
            });
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta;
        setFormData(prevData => ({
            ...prevData,
            [name]: selectedOption ? selectedOption.value : '' // Handle single selection
        }));
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleDateChange = (date) => {
        if (userType === 'admin') {
            setFormData(prevData => ({
                ...prevData,
                date
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const slug = generateSlug(formData.name);
        const rating = parseInt(formData.rating, 10);

        if (isNaN(rating) || rating < 1 || rating > 5) {
            alert('Rating must be an integer between 1 and 5');
            return;
        }

        const dataToSend = {
            ...formData,
            slug,
            rating,
            date: userType === 'admin' ? formatDate(formData.date) : undefined // Include date only for admin
        };

        if (userType === 'admin') {
            try {
                const response = await fetch('/api/authenticate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();

                if (response.ok) {
                    addPlace(dataToSend);
                    alert('Place added successfully');
                    navigate('/'); // Redirect to home page
                    window.location.reload(); // Reload the page
                } else {
                    setAuthError(data.error);
                }
            } catch (error) {
                setAuthError('An error occurred while authenticating.');
            }
        } else {
            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ formData: dataToSend }),
                });
                const data = await response.json();

                if (response.ok) {
                    alert('Email sent successfully');
                    navigate('/'); // Redirect to home page
                    window.location.reload(); // Reload the page
                } else {
                    alert('An error occurred while sending the email.');
                }
            } catch (error) {
                alert('An error occurred while sending the email.');
            }
        }

        setFormData({
            name: '',
            address: '',
            rating: '',
            tag: '',
            latitude: '',
            longitude: '',
            site: '',
            description: ''
        });
        setEmail('');
        setPassword('');
        setAuthError('');
    };

    const statusOptions = [
        { value: 'Gone', label: 'Gone' },
        { value: 'ToGo', label: 'ToGo' }
    ];

    const tagOptions = [
        { value: 'Food', label: 'Food' },
        { value: 'Chill', label: 'Chill' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Library', label: 'Library' }
    ];

    return (
        <motion.div
            className="max-w-md mx-auto mt-32 mb-10 md:mb-32 md:mt-10 p-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-4">Add New Place</h2>
            <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <label className="mb-1 font-medium" htmlFor="userType">User Type</label>
                    <select
                        id="userType"
                        name="userType"
                        value={userType}
                        onChange={handleUserTypeChange}
                        className="border p-2 rounded"
                    >
                        <option value="guest">Guest</option>
                        <option value="admin">Admin</option>
                    </select>
                </motion.div>

                {userType === 'admin' && (
                    <>
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <label className="mb-1 font-medium" htmlFor="email">Email</label>
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

                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        >
                            <label className="mb-1 font-medium" htmlFor="password">Password</label>
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

                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <label className="mb-1 font-medium" htmlFor="name">Name</label>
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

                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    <label className="mb-1 font-medium" htmlFor="address">Address</label>
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

                {userType === 'admin' && (
                    <>
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                        >
                            <label className="mb-1 font-medium" htmlFor="status">Status</label>
                            <Select
                                id="status"
                                name="status"
                                value={statusOptions.find(option => option.value === formData.status)}
                                onChange={handleSelectChange}
                                options={statusOptions}
                                className="basic-single-select w-full"
                                classNamePrefix="select"
                            />
                        </motion.div>

                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                        >
                            <label className="mb-1 font-medium" htmlFor="date">Date</label>
                            <DatePicker
                                id="date"
                                name="date"
                                selected={formData.date}
                                onChange={handleDateChange}
                                dateFormat="dd-MM-yyyy"
                                className="border p-2 rounded w-full"
                                placeholderText="dd-mm-yyyy"
                            />
                        </motion.div>
                    </>
                )}

                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                >
                    <label className="mb-1 font-medium" htmlFor="latitude">Latitude</label>
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

                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                >
                    <label className="mb-1 font-medium" htmlFor="longitude">Longitude</label>
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

                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.0 }}
                >
                    <label className="mb-1 font-medium" htmlFor="tag">Tag</label>
                    <Select
                        id="tag"
                        name="tag"
                        value={tagOptions.find(option => option.value === formData.tag)}
                        onChange={handleSelectChange}
                        options={tagOptions}
                        className="basic-single-select w-full"
                        classNamePrefix="select"
                    />
                </motion.div>

                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.1 }}
                >
                    <label className="mb-1 font-medium" htmlFor="rating">Rating (1-5)</label>
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

                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                >
                    <label className="mb-1 font-medium" htmlFor="site">Official Site</label>
                    <input
                        type="url"
                        id="site"
                        name="site"
                        value={formData.site}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </motion.div>

                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.3 }}
                >
                    <label className="mb-1 font-medium" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        rows="4"
                    />
                </motion.div>

                <motion.button
                    type="submit"
                    className="bg-gray-800 text-white p-2 rounded w-full hover:cursor-pointer hover:bg-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.4 }}
                >
                    Submit
                </motion.button>

                {authError && (
                    <motion.div
                        className="text-red-500 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.5 }}
                    >
                        {authError}
                    </motion.div>
                )}
            </motion.form>
        </motion.div>
    );
}

export default CustomForm;
