import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
    const {user} = useContext(AuthContext)
    console.log(user)
    const navigate = useNavigate()
    
      const {isLoading, data:wishlists, error} = useQuery({
            queryKey: ['wishlists'],
            queryFn: async()=> {
                const res = await fetch(`http://localhost:5000/wishlist/${user.email}`);
                console.log(res)
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }
        });
        
    
        if(isLoading){
            return 'loading......'
        }
        if (error) {
            return `Error: ${error.message}`;
        }

        console.log(wishlists)

        const handleMakeOffer = property => {
            console.log(property)
            navigate('/dashboard/make-offer', {state: property})

        }

    return (
        <div className="wishlist">
      <h1>Your Wishlist</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {wishlists.map(property => (
        <div className="property-card border rounded-lg p-2" key={property._id}>
          <img src={property.propertyImage} alt={property.title} />
          <h2>{property.title}</h2>
          <p>location: {property.propertyLocation}</p>
          <p>Agent: {property.agentName}</p>
          <img src={property.agentImage} alt={property.agentName} />
          <p>Status: {property.status}</p>
          <p>Price Range: $ ({property.priceRange})</p>
          <button onClick={() => handleMakeOffer(property)}>Make an Offer</button>
          <button onClick={() => handleRemove(property.id)}>Remove</button>
        </div>
      ))}
      </div>
    </div>
    );
}

export default Wishlist;