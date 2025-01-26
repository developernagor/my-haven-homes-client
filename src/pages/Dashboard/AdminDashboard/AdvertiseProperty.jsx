import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

function AdvertiseProperty() {

    const {isLoading, data: properties, error} = useQuery({
        queryKey:['properties'],
        queryFn: async() => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/properties/verified`);
            console.log(res)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json(); 


        }

    })

    if (isLoading) {
        return <div>Loading..........</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log(properties) 

    const handleAddAdvertise = async(property) => {
        // const advertisement = {
        //     userId: user.uid,
        //     propertyId: property._id,
        //     title: property.title,
        //     description: property.description,
        //     priceRange: `${property.minimumPrice} - ${property.maximumPrice}`,
        //     agentName: property.agentName,
        // };

        // Save to wishlist in the database
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/advertisements`, property);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Property added to the Advertisement Section",
                showConfirmButton: false,
                timer: 1500
              });
            
        } catch (error) {
            console.error("Error adding advertise:", error);
        }
    };

    return (
        <div>
            <h1>Advertise Property</h1>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price Range</th>
                        <th>Agent Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id}>
                            <td><img src={property.image} alt={property.title} width="100" /></td>
                            <td>{property.title}</td>
                            <td>{property.priceRange}</td>
                            <td>{property.agentName}</td>
                            <td>
                                <button onClick={() => handleAddAdvertise(property)} 
                                className="border rounded-lg px-4 py-1 bg-purple-600 text-white font-semibold"
                                    >Advertise</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdvertiseProperty;