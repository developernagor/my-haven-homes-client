import React from 'react';
import { Link } from 'react-router-dom';

function Property({property}) {
    // console.log(property)
    const {
        _id,agentEmail,agentImage, agentName, image, location,status, maximumPrice, minimumPrice,title
    } = property;
    return (
        <div className='border p-2 rounded-lg '>
           <img src={image} alt={`Property image of ${title}`} />

            <h2 className='text-xl'>{title}</h2>
            <h2 className='text-xl'>{location}</h2>
            <h2 className='text-xl'>Status: {status}</h2>
            <h2 className='text-xl'>Price Range: $ {minimumPrice} - $ {maximumPrice}</h2>
            
            <div className='flex items-center gap-4 my-3 overflow-x-scroll'>
            <img src={agentImage || 'default-image-url.jpg'} alt={`Agent ${agentName}`} className='rounded-lg'/>

            <div className='overflow-y-visible'>
                <h2 className='font-semibold text-xl mb-1 '>Agent Info:</h2>
            <h2> {agentName}</h2>
            <h2 className='overflow-hidden'> {agentEmail}</h2>
            </div>
            </div>
            
            
            
            <div>
            <Link to={`/properties/${_id}`}><button 
            className="w-[50%] mx-auto border rounded-lg px-4 py-1 bg-purple-600 text-white font-semibold"
            >Details</button></Link>
            </div>
        </div>
    );
}

export default Property;