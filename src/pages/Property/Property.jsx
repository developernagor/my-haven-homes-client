import React from 'react';
import { Link } from 'react-router-dom';

function Property({property}) {
    console.log(property)
    const {
        _id,agentEmail, agentName, image, location, maximumPrice, minimumPrice,title
    } = property;
    return (
        <div className='border p-2 rounded-lg'>
            <img src={image} alt="" />
            <h2>{title}</h2>
            <h2>{location}</h2>
            <h2>Agent Name: {agentName}</h2>
            
            <h2>Price Range: $ {minimumPrice} - $ {maximumPrice}</h2>
            
            <Link to={`/properties/${_id}`}><button className='btn'>Details</button></Link>
        </div>
    );
}

export default Property;