import { useQuery } from '@tanstack/react-query';
import React from 'react';

function MySoldProperties() {
    const { isLoading, data: offers = [], error } = useQuery({
        queryKey: ['offers'],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/agent/offers/status`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
    });

    if (isLoading) {
        return <div>Loading properties...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    console.log(offers)
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Sold Properties</h2>
            {offers.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Property Title</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Buyer Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Buyer Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Sold Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            >
                                <td className="border border-gray-300 px-4 py-2">{offer.propertyTitle}</td>
                                <td className="border border-gray-300 px-4 py-2">{offer.propertyLocation}</td>
                                <td className="border border-gray-300 px-4 py-2">{offer.buyer.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{offer.buyer.name}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    $ {offer.offerAmount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No sold properties found.</div>
            )}
        </div>
    );
}

export default MySoldProperties;
