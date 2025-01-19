import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function ManageProperties() {
    const queryClient = useQueryClient();
    const { isLoading, data: properties, error } = useQuery({
        queryKey: ['agentProperties'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/properties');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
    });

    const verifyPropertyMutation = useMutation(
        async (propertyId) => {
            const res = await fetch(`http://localhost:5000/properties/${propertyId}/verify`, {
                method: 'POST',
            });
            if (!res.ok) {
                throw new Error('Failed to verify the property');
            }
            return res.json();
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['agentProperties']);
            },
        }
    );

    const rejectPropertyMutation = useMutation(
        async (propertyId) => {
            const res = await fetch(`http://localhost:5000/properties/${propertyId}/reject`, {
                method: 'POST',
            });
            if (!res.ok) {
                throw new Error('Failed to reject the property');
            }
            return res.json();
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['agentProperties']);
            },
        }
    );

    if (isLoading) {
        return 'Loading...';
    }

    if (error) {
        return `Error: ${error.message}`;
    }

    return (
        <div>
            <h2>Manage Properties</h2>
            <table className="table-auto border-collapse border border-slate-400 w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-300 px-4 py-2">Title</th>
                        <th className="border border-slate-300 px-4 py-2">Location</th>
                        <th className="border border-slate-300 px-4 py-2">Agent Name</th>
                        <th className="border border-slate-300 px-4 py-2">Agent Email</th>
                        <th className="border border-slate-300 px-4 py-2">Price Range</th>
                        <th className="border border-slate-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id}>
                            <td className="border border-slate-300 px-4 py-2">{property.title}</td>
                            <td className="border border-slate-300 px-4 py-2">{property.location}</td>
                            <td className="border border-slate-300 px-4 py-2">{property.agentName}</td>
                            <td className="border border-slate-300 px-4 py-2">{property.agentEmail}</td>
                            <td className="border border-slate-300 px-4 py-2">${property.minimumPrice} - ${property.maximumPrice}</td>
                            <td className="border border-slate-300 px-4 py-2">
                                {property.status === 'verified' ? (
                                    'Verified'
                                ) : property.status === 'rejected' ? (
                                    'Rejected'
                                ) : (
                                    <>
                                        <button
                                            onClick={() => verifyPropertyMutation.mutate(property._id)}
                                            className="btn btn-success mr-2"
                                        >
                                            Verify
                                        </button>
                                        <button
                                            onClick={() => rejectPropertyMutation.mutate(property._id)}
                                            className="btn btn-danger"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageProperties;
