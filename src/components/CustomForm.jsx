import { useState, useContext } from 'react';
import Select from 'react-select';
import { PlaceContext } from '../store/place-context.jsx';

function CustomForm() {
    const { addPlace } = useContext(PlaceContext);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        date: '',
        rating: '',
        tag: '', // Changed to string
        latitude: '',
        longitude: '',
        status: '', // Changed to string
    });
    const [userType, setUserType] = useState('guest'); // 'admin' or 'guest'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Function to convert Turkish characters to English equivalents
    const convertTurkishChars = (str) => {
        const turkishToEnglishMap = {
            'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'ı': 'i', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U',
            'ç': 'c', 'ğ': 'g', 'ö': 'o', 'ş': 's', 'ü': 'u'
        };

        return str.split('').map(char => turkishToEnglishMap[char] || char).join('');
    };

    // Function to convert a string to a slug
    const generateSlug = (name) => {
        // Convert Turkish characters first
        const normalizedName = convertTurkishChars(name);

        return normalizedName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
    };

    // Handle input changes
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

    const handleSelectChange = (selectedOptions, actionMeta) => {
        const { name } = actionMeta;
        setFormData(prevData => ({
            ...prevData,
            [name]: selectedOptions.map(option => option.value).join(', ') // Convert array to string
        }));
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate slug from the name
        const slug = generateSlug(formData.name);

        // Convert rating to integer and validate it
        const rating = parseInt(formData.rating, 10);
        if (isNaN(rating) || rating < 1 || rating > 5) {
            alert('Rating must be an integer between 1 and 5');
            return;
        }

        // Prepare the data to send
        const dataToSend = {
            ...formData,
            slug,
            rating // Always include rating
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

                console.log('Response data:', data);

                if (response.ok) {
                    // Authentication successful
                    addPlace(dataToSend); // Call the addPlace function from context
                    alert('Place added successfully');
                } else {
                    // Authentication failed
                    setAuthError(data.error);
                }
            } catch (error) {
                setAuthError('An error occurred while authenticating.');
            }
        } else {
            try {
                /*await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: 'hi@furkanunsalan.dev',
                        subject: 'New Place Submission',
                        text: JSON.stringify(dataToSend, null, 2)
                    }),
                });*/
                // not minding the send email feature for now
                console.log(dataToSend)

                alert('Email sent successfully');
            } catch (error) {
                alert('An error occurred while sending the email.');
            }
        }

        // Reset the form
        setFormData({
            name: '',
            address: '',
            date: '',
            rating: '',
            tag: '',
            latitude: '',
            longitude: '',
            status: '',
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
                    <label className="mb-1 font-medium" htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
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
                    <label className="mb-1 font-medium" htmlFor="status">Status</label>
                    <Select
                        id="status"
                        name="status"
                        isMulti
                        value={statusOptions.filter(option => formData.status.split(', ').includes(option.value))}
                        onChange={handleSelectChange}
                        options={statusOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="tag">Tag</label>
                    <Select
                        id="tag"
                        name="tag"
                        isMulti
                        value={tagOptions.filter(option => formData.tag.split(', ').includes(option.value))}
                        onChange={handleSelectChange}
                        options={tagOptions}
                        className="basic-multi-select"
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

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
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

    )
}

export default CustomForm