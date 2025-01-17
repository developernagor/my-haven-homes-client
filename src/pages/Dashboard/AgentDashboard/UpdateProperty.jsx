import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function UpdateProperty() {

    const {user} = useContext(AuthContext)
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        agentName: '',
        status: '',
        minimumPrice: '',
        maximumPrice: '',
    });

    const { isLoading, data: property, refetch } = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/update-property/${id}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
        onSuccess: (data) => {
            setFormData({
                title: data.title,
                location: data.location,
                agentName: data.agentName,
                status: data.status,
                minimumPrice: data.minimumPrice,
                maximumPrice: data.maximumPrice,
            });
        },
    });

    if (isLoading) {
        return 'Loading...';
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/dashboard/update-property/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert('Property updated successfully!');
                refetch();
            } else {
                alert('Failed to update the property. Please try again.');
            }
        } catch (error) {
            console.error('Error updating property:', error);
            alert('An error occurred. Please try again.');
        }
    }
   


    return (
        <div className="px-4 py-10 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-8">Update Property</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Property Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Property Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          {/* Minimum Price */}
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Minimum Price
          </label>
          <input
            type="number"
            name="minimumPrice"
            value={formData.minimumPrice}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* Maximum Price */}
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Maximum Price
          </label>
          <input
            type="number"
            name="maximumPrice"
            value={formData.maximumPrice}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        </div>
        
    {/* Agent Input */}
        <div className="flex">
          {/* Agent Name */}
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Agent Name
          </label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-100"
          />
        </div>

        {/* Agent Email */}
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Agent Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-gray-100"
          />
        </div>
        </div>

        

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Property
          </button>
        </div>
      </form>
        </div>
    );
}

export default UpdateProperty;