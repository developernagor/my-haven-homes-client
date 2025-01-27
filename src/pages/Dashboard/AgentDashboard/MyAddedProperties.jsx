import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import MyProperty from './MyProperty'


function MyAddedProperties() {
    const { user } = useContext(AuthContext);
    const { isLoading, data: myProperties = [],refetch } = useQuery({
        queryKey: ['myProperties'],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/properties/${user?.email}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
    });

    const handleDelete = async (propertyId) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/properties/${propertyId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete the property');
                }
                alert('Property deleted successfully.');
                refetch();
                // Add a mechanism to refetch properties after delete
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold">Loading properties...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-8">
                My Added Properties: {myProperties.length}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProperties.map((myProperty) => (
                    <MyProperty
                        key={myProperty._id}
                        myProperty={myProperty}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default MyAddedProperties;
