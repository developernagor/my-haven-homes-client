import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Property from '../Property/Property';

function AllProperties() {
    const {user} = useContext(AuthContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const {isLoading, data:properties, error} = useQuery({
        queryKey: ['properties'],
        queryFn: async()=> {
            const res = await fetch('http://localhost:5000/properties');
            console.log(res)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });
    

    if(isLoading){
        return 'loading......'
    }
    if (error) {
        return `Error: ${error.message}`;
    }

    // Filter properties based on the search term
    const filteredProperties = properties.filter(property =>
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort properties based on the selected order
    const sortedProperties = filteredProperties.sort((a, b) => {
        const minPriceA = parseInt(a.minimumPrice, 10);
        const minPriceB = parseInt(b.minimumPrice, 10);
        return sortOrder === 'asc' ? minPriceA - minPriceB : minPriceB - minPriceA;
    });



    return (
        <div>
            <div className="flex items-center justify-between text-end mb-4">
            <div>
            All Verified Properties: {sortedProperties.filter((property) => property.status === 'verified').length}
            </div>

                <div>
                <input
                    type="text"
                    placeholder="Search by location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="select select-bordered ml-2"
                >
                    <option value="asc">Sort by Price: Low to High</option>
                    <option value="desc">Sort by Price: High to Low</option>
                </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.filter((property) => property.status === 'verified').map((property) => (
                    <Property key={property._id} property={property} />
                ))}
            </div>
        </div>
    );
}

export default AllProperties;