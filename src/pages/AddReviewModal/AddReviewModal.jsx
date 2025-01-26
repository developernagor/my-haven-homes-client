import React, { useState } from 'react';
import axios from 'axios';

function AddReviewModal({property, propertyId, onClose }) {
    const [reviewData, setReviewData] = useState({
        reviewerName: '',
        reviewerEmail: '',
        reviewerImage: '',
        rating: 1,
        comment: '',
        propertyTitle: property.title,
        agentName: property.agentName,
        
    });
    console.log(reviewData)
    console.log(property)
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!reviewData.reviewerName || !reviewData.reviewerEmail || !reviewData.reviewerImage || !reviewData.comment || !reviewData.rating) {
            setError("All fields are required.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        // Prepare review data
        const review = {
            propertyId,
            reviewerName: reviewData.reviewerName,
            reviewerEmail: reviewData.reviewerEmail,
            reviewerImage: reviewData.reviewerImage,
            rating: reviewData.rating,
            comment: reviewData.comment,
            reviewTime: new Date(),
            agentName: reviewData.agentName,
            propertyTitle: reviewData.propertyTitle
        };
        console.log(review)

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, review);
            alert('Review submitted successfully!');
            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">Add Review</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700">Your Name</label>
                        <input
                            type="text"
                            id="reviewerName"
                            name="reviewerName"
                            value={reviewData.reviewerName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="reviewerEmail" className="block text-sm font-medium text-gray-700">Your Email</label>
                        <input
                            type="email"
                            id="reviewerEmail"
                            name="reviewerEmail"
                            value={reviewData.reviewerEmail}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="reviewerImage" className="block text-sm font-medium text-gray-700">Your Image URL</label>
                        <input
                            type="url"
                            id="reviewerImage"
                            name="reviewerImage"
                            value={reviewData.reviewerImage}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                        <select
                            id="rating"
                            name="rating"
                            value={reviewData.rating}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                            required
                        >
                            {[1, 2, 3, 4, 5].map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Review</label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={reviewData.comment}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddReviewModal;
