import React, { useState } from 'react';
import axios from 'axios';

function ManageProperties() {
  const [properties, setProperties] = useState([]);
  // console.log(properties)
  
  // Fetch properties initially from API
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleVerify = async (propertyId) => {
    
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/properties/verify/${propertyId}`, { status: 'verified' });
      // Update the property status locally
      setProperties(properties.map(property => 
        property._id === propertyId ? { ...property, status: 'verified' } : property
      ));
    } catch (error) {
      console.error('Error verifying property:', error);
    }
  };

  const handleReject = async (propertyId) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/properties/reject/${propertyId}`, { status: 'rejected' });
      // Update the property status locally
      setProperties(properties.map(property => 
        property._id === propertyId ? { ...property, status: 'rejected' } : property
      ));
    } catch (error) {
      console.error('Error rejecting property:', error);
    }
  };

  // Call the fetch function when the component mounts
  React.useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Property Title</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Agent Name</th>
            <th className="border p-2">Agent Email</th>
            <th className="border p-2">Price Range</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            
            <tr key={property._id}>
              <td className="border p-2">{property.title}</td>
              <td className="border p-2">{property.location}</td>
              <td className="border p-2">{property.agentName}</td>
              <td className="border p-2">{property.agentEmail}</td>
              <td className="border p-2">$ {property.minimumPrice}-{property.maximumPrice}</td>
              <td className="border p-2">
                {property.status === 'verified' ? (
                  <span className="text-green-500">Verified</span>
                ) : property.status === 'rejected' ? (
                  <span className="text-red-500">Rejected</span>
                ) : (
                  <>
                    <button
                      onClick={() => handleVerify(property._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleReject(property._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProperties;
