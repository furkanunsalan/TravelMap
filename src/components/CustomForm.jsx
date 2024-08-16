import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PlaceContext } from '../store/place-context.jsx';
import { formatDate } from "../../util/formatDate.js";
import { generateSlug } from "../../util/generateSlug.js";

function CustomForm() {
    const { addPlace } = useContext(PlaceContext);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        date: null,
        rating: '',
        tag: '',
        latitude: '',
        longitude: '',
        status: '',
        site: '',
        description: ''
    });
    const [userType, setUserType] = useState('guest');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate()

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
        setFormData(prevData => ({
            ...prevData,
            date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const slug = generateSlug(formData.name);
        const rating = parseInt(formData.rating, 10);
        const isToGo = formData.status === 'ToGo';

        if (isNaN(rating) || rating < 1 || rating > 5) {
            alert('Rating must be an integer between 1 and 5');
            return;
        }

        // Conditional validation for date
        if (!isToGo && !formData.date) {
            alert('Date is required unless the status is "ToGo"');
            return;
        }

        const formattedDate = formatDate(formData.date);

        const dataToSend = {
            ...formData,
            date: formattedDate,
            slug,
            rating
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
            date: null,
            rating: '',
            tag: '',
            latitude: '',
            longitude: '',
            status: '',
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
        { value: 'Burger', label: 'Burger' },
        { value: 'Chill', label: 'Chill' },
        { value: 'ToGo', label: 'ToGo' }
    ];

    return (
        <div className="max-w-md mx-auto mt-32 mb-10 md:mb-32 md:mt-10 p-5">
            <h2 className="text-2xl font-bold mb-4">Add New Place</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
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
                </div>

                {userType === 'admin' && (
                    <>
                        <div className="flex flex-col">
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
                        </div>

                        <div className="flex flex-col">
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
                        </div>
                    </>
                )}

                <div className="flex flex-col">
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
                </div>

                <div className="flex flex-col">
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
                </div>

                <div className="flex flex-col">
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
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="date">Date</label>
                    <DatePicker
                        id="date"
                        name="date"
                        selected={formData.date}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                        className="border p-2 rounded w-full"
                        placeholderText="dd-mm-yyyy"
                        disabled={formData.status === 'ToGo'} // Disable date picker if status is ToGo
                    />
                </div>

                <div className="flex flex-col">
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
                </div>

                <div className="flex flex-col">
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
                </div>

                <div className="flex flex-col">
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
                </div>

                <div className="flex flex-col">
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
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="site">Official Site</label>
                    <input
                        type="url"
                        id="site"
                        name="site"
                        value={formData.site}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        rows="4"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-gray-800 text-white p-2 rounded w-full hover:cursor-pointer hover:bg-gray-600"
                >
                    Submit
                </button>

                {authError && (
                    <div className="text-red-500 mt-4">
                        {authError}
                    </div>
                )}
            </form>
        </div>
    );
}

export default CustomForm;
