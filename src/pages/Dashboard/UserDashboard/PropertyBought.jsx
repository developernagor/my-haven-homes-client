import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

function PropertyBought() {

    const {isLoading,data: offers,error} = useQuery({
        queryKey: ['offers'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/offers');
      console.log(res)
      if (!res.ok) {
          throw new Error('Network response was not ok');
      }
      return res.json();
        }
    })
    console.log(offers)
    if(isLoading){
        return <div>
            loading.......
        </div> ;
    }
    return (
        <div>
            Property Bought: {offers.length}
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    offers.map(property=>
                        <div key={property._id}>
                            <h2>Location: {property.propertyLocation}</h2>
                            <h2>Title: {property.propertyTitle}</h2>
                            <img src={property.propertyImage} alt="property Image" />
                            <h2>Agent Name: {property.agentName}</h2>
                            <h2>Offer Amount: {property.offerAmount}</h2>
                            <h2>Status: {property.status}</h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default PropertyBought;