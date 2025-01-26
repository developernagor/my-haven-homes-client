import React, { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
function AddProperty() {
  const { user } = useContext(AuthContext); // Access logged-in user info
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [propertyData, setPropertyData] = useState({
    title: "",
    location: "",
    image: null,
    description:"",
    minimumPrice: parseInt(""),
    maximumPrice: parseInt(""),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]:
        name === "minimumPrice" || name === "maximumPrice"
          ? Number(value)
          : value,
    });
  };

  const handleImageChange = (e) => {
    setPropertyData({
      ...propertyData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    // Validation
    if (propertyData.minimumPrice < 0) {
      setError("price must be only positive numbers");
      return;
    }
    if (
      propertyData.maximumPrice < propertyData.minimumPrice ||
      propertyData.maximumPrice == propertyData.minimumPrice
    ) {
      setError("Maximum price must be greater than minimum price");
      return;
    }

    // Image upload
    const formData = new FormData();
    formData.append("image", propertyData.image);

    try {
      const res = await axios.post(image_hosting_api, formData);
      const imageUrl = res.data.data.url;

      const finalPropertyData = {
        ...propertyData,
        image: imageUrl,
        agentName: user.displayName,
        agentEmail: user.email,
        agentImage: user.photoURL,
      };

      // Handle form submission, sending data to the backend.
      const response = await fetch(`${import.meta.env.VITE_API_URL}/properties`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(finalPropertyData),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setSuccess('Property Added Successfully.');
        form.reset();
      }
    } catch (error) {
      console.error("Error uploading image or submitting form:", error);
    }
    console.log(propertyData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Add Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Title
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Property Location
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Property Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
            value={propertyData.description}
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
            value={propertyData.minimumPrice}
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
            value={propertyData.maximumPrice}
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
            Add Property
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 my-2">{error}</p>}
      {success && <p className="text-green-500 my-2">{success}</p>
      }
    </div>
  );
}

export default AddProperty;
