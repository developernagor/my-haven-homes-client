import { useQuery } from '@tanstack/react-query';
import React from 'react';

function MyAddedProperties() {
    const {isPending, data:properties} = useQuery({
        queryKey: ['properties'],
        queryFn: async()=> {
            const res = await fetch('http://localhost:5000/properties');
            return res.json();
        }
    });
    

    if(isPending){
        return 'loading......'
    }

    console.log(properties)


    return (
        <div>
            My Added Properties
        </div>
    );
}

export default MyAddedProperties;