import { useState, useContext } from 'react';
import Select from 'react-select';
import { PlaceContext } from '../store/place-context.jsx';

function SubmitPlace() {
    const { addPlace } = useContext(PlaceContext);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        date: '',
        rating: '',
        tag: '', // Changed to string
        latitude: '',
        longtitude: '',
        status: '', // Changed to string
    });

    // Function to convert a string to a slug
    const generateSlug = (name) => {
        return name
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

    // Handle form submission
    const handleSubmit = (e) => {
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

        // Call the addPlace function from context
        addPlace(dataToSend);

        // Reset the form
        setFormData({
            name: '',
            address: '',
            date: '',
            rating: '',
            tag: '',
            latitude: '',
            longtitude: '',
            status: '',
        });
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
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Place</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label className="mb-1 font-medium" htmlFor="longtitude">Longitude</label>
                    <input
                        type="text"
                        id="longtitude"
                        name="longtitude"
                        value={formData.longtitude}
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
            </form>
        </div>
    );
}

export default SubmitPlace;
