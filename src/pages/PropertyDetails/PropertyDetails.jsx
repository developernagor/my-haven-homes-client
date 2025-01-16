import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import ReviewList from '../ReviewList/ReviewList';
import AddReviewModal from '../AddReviewModal/AddReviewModal';
// import AddReviewModal from './AddReviewModal';
// import ReviewsList from './ReviewsList';

function PropertyDetails() {
    const { id } = useParams();
    console.log(id)
    const { user } = useContext(AuthContext);
    const [property, setProperty] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch property details by ID
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-properties/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error("Error fetching property details:", error);
                setError("Could not load property details.");
            } finally {
                setLoading(false);
            }
        };
        fetchPropertyDetails();
    }, [id]);

    const handleAddToWishlist = async() => {
        const wishlistData = {
            userId: user.uid,
            propertyId: property._id,
            title: property.title,
            description: property.description,
            priceRange: `${property.minimumPrice} - ${property.maximumPrice}`,
            agentName: property.agentName,
        };

        // Save to wishlist in the database
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, wishlistData);
            alert("Property added to wishlist");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    const {
        _id,title,description,image,agentName,agentEmail,location,minimumPrice,maximumPrice} = property;
    console.log(property)

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p>Description: {description}</p>
            <p>Price Range: ${minimumPrice} - ${maximumPrice}</p>
            <p>Agent: {agentName}</p>
            <button 
                onClick={handleAddToWishlist}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
            >
                Add to Wishlist
            </button>

            {/* <ReviewsList propertyId={id} /> */}

            

            <ReviewList propertyId={id} />
            <button onClick={() => setShowModal(true)} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700">Add a Review</button>
            {showModal && <AddReviewModal propertyId={id} onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default PropertyDetails;
