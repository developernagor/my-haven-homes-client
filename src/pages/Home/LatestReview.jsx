import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const LatestReview = () => {
  const [recentReviews, setRecentReviews] = useState([]);

  const { isPending, isError, data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        Failed to load reviews. Please try again later.
      </div>
    );
  }

  const mostRecentReviews = [...reviews]
    .sort((a, b) => new Date(b.reviewTime) - new Date(a.reviewTime))
    .slice(0, 6);

  return (
    <div className="px-2 sm:px-4 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Latest User Reviews</h2>
      {mostRecentReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostRecentReviews.map((review) => (
            <div
              key={review.id || review.reviewerName}
              className="bg-white rounded-lg shadow-md overflow-hidden p-6"
            >
              <div className="flex items-center">
                <img
                  src={review.reviewerImage || "/placeholder.jpg"}
                  alt={review.reviewerName || "User"}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {review.reviewerName || "Anonymous"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {review.propertyTitle || "No Property Title"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{review.comment || "No comment provided."}</p>
              <p className="mt-4 text-gray-500 text-sm">
                {new Date(review.reviewTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-600">No Reviews Data Found.</div>
      )}
    </div>
  );
};

export default LatestReview;
