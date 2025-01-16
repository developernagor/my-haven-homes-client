import React from 'react';

function Property({property}) {
    console.log(property)
    const {
        agentEmail, agentName, image, location, maximumPrice, minimumPrice,title
    } = property;
    return (
        <div className='border p-2 rounded-lg'>
            <img src={image} alt="" />
            <h2>{title}</h2>
            <h2>{location}</h2>
            <h2>Agent Name: {agentName}</h2>
            
            <h2>Price Range: $ {minimumPrice} - $ {maximumPrice}</h2>
            
            <button className='btn'>Details</button>
        </div>
    );
}

export default Property;