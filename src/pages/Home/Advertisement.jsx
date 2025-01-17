import React from 'react';

const properties = [
  {
    image: 'https://example.com/property1.jpg',
    location: 'New York, USA',
    priceRange: '$500,000 - $700,000',
    verified: true,
    detailsLink: '/property/1'
  },
  {
    image: 'https://example.com/property2.jpg',
    location: 'Los Angeles, USA',
    priceRange: '$600,000 - $800,000',
    verified: false,
    detailsLink: '/property/2'
  },
  {
    image: 'https://example.com/property3.jpg',
    location: 'Chicago, USA',
    priceRange: '$400,000 - $600,000',
    verified: true,
    detailsLink: '/property/3'
  },
  {
    image: 'https://example.com/property4.jpg',
    location: 'Houston, USA',
    priceRange: '$450,000 - $650,000',
    verified: false,
    detailsLink: '/property/4'
  },
];

const Advertisement = () => {
  return (
    <div className="px-4 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={property.image} alt="Property" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{property.location}</h3>
              <p className="text-gray-600 mt-2">{property.priceRange}</p>
              <p className="text-sm mt-2">
                Verification Status: 
                <span className={`ml-1 font-semibold ${property.verified ? 'text-green-500' : 'text-red-500'}`}>
                  {property.verified ? 'Verified' : 'Unverified'}
                </span>
              </p>
              <button
                onClick={() => window.location.href = property.detailsLink}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
