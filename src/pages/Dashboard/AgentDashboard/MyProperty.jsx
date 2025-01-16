import React from 'react';

function MyProperty({myProperty}) {
    const {image,title,location,agentName,agentImage,status,minimumPrice, maximumPrice} = myProperty;
    return (
        <div className='border p-2 rounded-2xl'>
            <img src={image} alt="" />
            <h2>title: {title}</h2>
            <h2>Location: {location}</h2>
            <h2>Agent Name: {agentName}</h2>
            <h2>Agent Image: {agentImage}</h2>
            <h2>Status: {status}</h2>
            <h2>Price Range: $ {minimumPrice} - $ {maximumPrice}</h2>
            <button className='btn bg-green-500 text-white'>Update</button>
            <button className='btn bg-red-500 text-white'>Delete</button>
            
        </div>
    );
}

export default MyProperty;