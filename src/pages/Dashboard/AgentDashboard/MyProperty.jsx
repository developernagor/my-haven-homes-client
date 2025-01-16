import React from 'react';

function MyProperty({myProperty}) {
    const {image,title,location,agentName,agentImage,status,minimumPrice, maximumPrice} = myProperty;
    return (
        <div className='max-h-[450px] border p-2 rounded-2xl text-start grid grid-rows-10'>
            <img src={image} alt="" className='row-span-4'/>
            <h2 className='row-span-1'>{title}</h2>
            <h2 className='row-span-1'>Location: {location}</h2>
            <h2 className='row-span-1'>Agent Name: {agentName}</h2>
            
            <h2 className='row-span-1'>Status: {status}</h2>
            <h2 className='row-span-1'>Price Range: $ {minimumPrice} - $ {maximumPrice}</h2>
            <div className='row-span-1'>
            <button className='btn bg-green-500 text-white'>Update</button>
            <button className='btn bg-red-500 text-white'>Delete</button>
            </div>
            
        </div>
    );
}

export default MyProperty;