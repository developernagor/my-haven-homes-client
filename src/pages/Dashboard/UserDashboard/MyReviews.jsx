import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

function MyReviews() {
    const { user } = useContext(AuthContext);
    // console.log(user);
    
    const { isLoading, data: myReviews, error } = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${user?.email}`);
            // console.log(res);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });
    
    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }
    if (error) {
        return <div className="text-center py-8">Error: {error.message}</div>;
    }
    // console.log(myReviews);

    const handleDeleteReview = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'The review has been deleted.', 'success');
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting review:', error);
                    });
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">My Reviews</h1>
            <p className="text-center text-gray-600 mb-8">You have {myReviews.length} reviews.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    myReviews.map(myReview => (
                        <div key={myReview._id} className="bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-800">Property Title: {myReview.propertyTitle}</h3>
                            <p className="text-sm text-gray-600 mt-2">Agent Name: {myReview.agentName}</p>
                            <p className="text-sm text-gray-600">Review Time: {myReview.reviewTime}</p>
                            <p className="mt-2 text-gray-800">Review Description: {myReview.comment}</p>

                            <button 
                                className="mt-4 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                onClick={() => handleDeleteReview(myReview._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MyReviews;
