import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import PurchaseModal from '../../../components/Payments/PurchaseModal';
import { AuthContext } from '../../../providers/AuthProvider';

function PropertyBought() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  // console.log(selectedProperty)

  const { user } = useContext(AuthContext);

  const { isLoading, data: offers = [], error } = useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/offers/${user?.email}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
  });

  const handlePurchase = (property) => {
    // console.log(property)
    setSelectedProperty(property);
    setModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    // console.log('Purchase confirmed for:', selectedProperty);
    setModalOpen(false);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Properties Bought: {offers.length}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {offers.map((property) => {
          return (
            <div key={property._id} className="property-card border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
              <div>
                <img
                  src={property.propertyImage}
                  alt="Property"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Title: {property.propertyTitle}</h2>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location: {property.propertyLocation}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Agent: {property.agentName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Offer Amount: ${property.offerAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status: {property.status}</p>
              </div>

              <div className="mt-4">
                {property.status === 'accepted' && (
                  <button
                    onClick={() => handlePurchase(property)}
                    className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Pay
                  </button>
                )}
                {property.status === 'bought' && (
                  <p className="text-sm text-green-600">Payment Successful: {property.transactionId}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          selectedProperty={selectedProperty}
          onConfirmPurchase={handleConfirmPurchase}
        />
      )}
    </div>
  );
}

export default PropertyBought;
