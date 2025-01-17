import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';



const Advertisement = () => {

  const {isLoading, isPending, data:properties} = useQuery({
    queryKey:['properties'],
    queryFn: async() => {
      const res = await fetch('http://localhost:5000/properties');
            console.log(res)
            if (!res.ok) {
                throw new Error('Network response was not ok');
    }
    return res.json();
  }
  })

  if(isPending){
    return 'loading......'
}

const latestProperties = [...properties]
.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))
.slice(0,4);


  return (
    <div className="px-4 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestProperties.map((property, index) => (
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
              <Link to={`/properties/${property._id}`}><button className='btn'>Details</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
