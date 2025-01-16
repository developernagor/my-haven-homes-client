import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

function AddProperty() {
    const { user } = useContext(AuthContext); // Access logged-in user info
    const [propertyData, setPropertyData] = useState({
        title: '',
        location: '',
        image: null,
        minimumPrice: '',
        maximumPrice: '',
        
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({
            ...propertyData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setPropertyData({
            ...propertyData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, sending data to the backend.
        fetch('http://localhost:5000/properties', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(propertyData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        console.log(propertyData);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-center mb-6">Add Property</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Property Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Title</label>
                    <input
                        type="text"
                        name="title"
                        value={propertyData.title}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Property Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Location</label>
                    <input
                        type="text"
                        name="location"
                        value={propertyData.location}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Property Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Agent Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Agent Name</label>
                    <input
                        type="text"
                        value={user.displayName}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-100"
                    />
                </div>

                {/* Agent Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Agent Email</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-100"
                    />
                </div>

                {/* Minimum Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price Range</label>
                    <input
                        type="text"
                        name="minimumPrice"
                        value={propertyData.minimumPrice}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                {/* Maximum Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price Range</label>
                    <input
                        type="text"
                        name="maximumPrice"
                        value={propertyData.maximumPrice}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Add Property
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProperty;