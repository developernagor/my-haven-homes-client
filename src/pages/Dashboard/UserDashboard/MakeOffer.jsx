import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';

const MakeOffer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state: property } = useLocation();
  const [offerAmount, setOfferAmount] = useState('');
  const [buyingDate, setBuyingDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const buyer = {
    email: user.email,
    name: user.displayName,
  };

  if (!property) {
    return <div>Property data not found</div>;
  }

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    const minPrice = property.minimumPrice;
    const maxPrice = property.maximumPrice;

    if (offerAmount < minPrice || offerAmount > maxPrice) {
      setError(`Offer amount must be between $${minPrice} and $${maxPrice}.`);
      return;
    }


    setLoading(true); // Start loading indicator
    setError(''); // Reset error
  
    try {
      const offerData = {
        propertyId: property._id,
        propertyLocation: property.propertyLocation,
        propertyTitle: property.title,
        propertyImage: property.propertyImage,
        agentName: property.agentName,
        offerAmount: Number(offerAmount),
        buyingDate,
        buyer,
        status: 'pending',
      };
  
      await axios.post(`${import.meta.env.VITE_API_URL}/offers`, offerData);
      setLoading(false); // End loading
      navigate('/dashboard/property-bought');
      // ... rest of your code
    } catch (error) {
      setLoading(false); // End loading on error
      setError(error.response?.data?.message || 'Failed to submit the offer. Please try again.');
    }
  };

  return (
    <div className="make-offer max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Make an Offer</h1>
      <form onSubmit={handleOfferSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Property Title:</label>
            <input type="text" value={property.title} readOnly className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-700">Property Location:</label>
            <input type="text" value={property.propertyLocation} readOnly className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-700">Agent Name:</label>
            <input type="text" value={property.agentName} readOnly className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-700">
              Offer Amount (Between ${property.minPrice} and ${property.maxPrice}):
            </label>
            <input
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Buyer Email:</label>
            <input type="email" value={buyer.email} readOnly className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-700">Buyer Name:</label>
            <input type="text" value={buyer.name} readOnly className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-700">Buying Date:</label>
            <input
              type="date"
              value={buyingDate}
              onChange={(e) => setBuyingDate(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Offer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeOffer;
