import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const LatestReview = () => {
  const [recentReviews, setRecentReviews] = useState([])

const {isPending, data:reviews} = useQuery({
  queryKey: ['reviews'],
  queryFn: async()=> {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`);
      console.log(res)
      if (!res.ok) {
          throw new Error('Network response was not ok');
      }
      return res.json();
  }
});

if(isPending){
  return 'loading......'
}

console.log(reviews)
const mostRecentReviews = [...reviews]
.sort((a,b) => new Date(b.reviewTime) - new Date(a.reviewTime))
.slice(0,6);
console.log(mostRecentReviews)

  return (
    <div className="px-4 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Latest User Reviews</h2>
      {mostRecentReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostRecentReviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <div className="flex items-center">
                {/* Uncomment and use if you have images */}
                {/* <img
                  src={review.image}
                  alt={`${review.reviewerName}`}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                /> */}
                <div>
                  <h3 className="text-xl font-semibold">{review.reviewerName}</h3>
                  <img src={review.reviewerImage} alt="" />
                  <p className="text-gray-600 text-sm">{review.propertyTitle}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{review.comment}</p>
              <p className="mt-4 text-gray-700">{new Date(review.reviewTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">No Reviews Data Found.</div>
      )}
    </div>
  );
};

export default LatestReview;
