import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Property from '../Property/Property';

function AllProperties() {
    const {user} = useContext(AuthContext)
    console.log(user)
    const {isPending, data:properties} = useQuery({
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
    

    if(isPending){
        return 'loading......'
    }

    console.log(properties)
   
    return (
        <div>
            All Properties:{properties.length}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    properties.map((property) => <Property key={property._id} property={property}></Property>)
                }
            </div>
        </div>
    );
}

export default AllProperties;