import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function UpdateProperty() {

    const {user} = useContext(AuthContext)
    const { id } = useParams();
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState()
    const [minimumPrice, setMinimumPrice] = useState("")
    const [maximumPrice, setMaximumPrice] = useState("")

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    
    // const [formData, setFormData] = useState({
    //     title: '',
    //     location: '',
    //     agentName: '',
    //     status: '',
    //     minimumPrice: '',
    //     maximumPrice: '',
    // });

    const { isLoading, data } = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/update-property/${id}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            } catch (error) {
                setError(error.message);
                throw error;
            }
        },
    });

    useEffect(() => {
        if(data){
            setTitle(data.title || "");
            setLocation(data.location || "");
            setDescription(data.description || "");
            setMinimumPrice(data.minimumPrice || "");
            setMaximumPrice(data.maximumPrice || "");
            setTitle(data.title || "");
        }
    },[data]);

    


    // if (isLoading) {
    //     return 'Loading...';
    // }

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateProperty = {
            title,
      location,
      description,
      minimumPrice,
      maximumPrice,

        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/update-property/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateProperty),
            });

            if (res.ok) {
                alert('Property updated successfully!');
                navigate('/dashboard/my-added-properties')
                
            } else {
                alert('Failed to update the property. Please try again.');
            }
        } catch (error) {
            console.error('Error updating property:', error);
            alert('An error occurred. Please try again.');
        }
    }

    if (isLoading) {
        return <p>Loading......</p>; // Add spinner styling in your CSS
      }
   


    return (
        <div className="px-4 py-10 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-8">Update Property</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={minimumPrice}
            onChange={(e) => setMinimumPrice(e.target.value)}
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
            value={maximumPrice}
            onChange={(e) => setMaximumPrice(e.target.value)}
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