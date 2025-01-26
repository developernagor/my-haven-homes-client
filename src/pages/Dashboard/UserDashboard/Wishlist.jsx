import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Wishlist() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { isLoading, data: wishlists,refetch, error } = useQuery({
        queryKey: ['wishlists'],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/wishlist/${user.email}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });

    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-4">Error: {error.message}</div>;
    }

    const handleMakeOffer = property => {
        navigate('/dashboard/make-offer', { state: property });
    };

    const handleRemove = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this",
                position: "top-end",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showConfirmButton: true,
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/wishlist/remove/${id}`);
                    if (response.status === 200) {
                        console.log('Property removed successfully');
                        // Optionally, refetch data or update local state to reflect the change
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Deleted",
                            text: "Wishlist has been deleted",
                            timer: 1500
                        });
                    }
                }
            });
        } catch (error) {
            console.log('Error removing property', error);
        }
    };
    

    return (
        <div className="wishlist py-6 px-4">
            <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>
            {wishlists.length === 0 ? (
                <div className="text-center text-gray-500">Your wishlist is empty. Add some properties!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlists.map((property) => (
                        <div className="property-card border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300" key={property._id}>
                            <img
                                src={property.propertyImage}
                                alt={property.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold">{property.title}</h2>
                            <p className="text-sm text-gray-500">{property.propertyLocation}</p>
                            <p className="text-sm font-semibold text-gray-700">Agent: {property.agentName}</p>
                            <img
                                src={property.agentImage}
                                alt={property.agentName}
                                className="w-12 h-12 rounded-full mt-2"
                            />
                            <p className="text-sm mt-2">Status: {property.status}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Price Range: ${property ? `${property.minimumPrice} - ${property.maximumPrice}` : 'N/A'}
                            </p>
                            
                            <div className="flex justify-between gap-4 mt-4">
                                <button
                                    onClick={() => handleMakeOffer(property)}
                                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                                >
                                    Make an Offer
                                </button>
                                <button
                                    onClick={() => handleRemove(property._id)}
                                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
