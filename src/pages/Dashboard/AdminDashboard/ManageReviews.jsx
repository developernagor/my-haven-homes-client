import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

function ManageReviews() {

    const {isLoading, data:reviews, refetch, error} = useQuery({
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`);
            console.log(res)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    })

    if(isLoading){
        return 'loading......'
    }
    if (error) {
        return `Error: ${error.message}`;
    }


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
                  refetch();
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
        <div>
      <h2>Manage Reviews: {reviews.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review._id} className="card bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <img src={review.reviewerImage} alt="Reviewer" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-gray-600">{review.reviewerEmail}</p>
              </div>
            </div>
            <p>{review.comment}</p>
            <button
              onClick={() => handleDeleteReview(review._id)}
              className="btn bg-red-500 text-white mt-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    );
}

export default ManageReviews;