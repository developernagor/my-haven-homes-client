import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewList({ propertyId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${propertyId}`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setError("Could not load reviews.");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [propertyId]);

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (reviews.length === 0) {
        return <p>No reviews yet. Be the first to add one!</p>;
    }
console.log(reviews)
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {reviews.map(review => (
                <div key={review._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <p><strong>{review.reviewerName}</strong> says:</p>
                    <p>"{review.comment}"</p>
                    <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
                </div>
            ))}
            </div>
        </div>
    );
}

export default ReviewList;
