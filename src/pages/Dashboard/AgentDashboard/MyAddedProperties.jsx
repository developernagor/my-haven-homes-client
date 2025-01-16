import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import MyProperty from './MyProperty';

function MyAddedProperties() {
    const {user} = useContext(AuthContext)
    console.log(user)
    const {isPending, data:myProperties} = useQuery({
        queryKey: ['myProperties'],
        queryFn: async()=> {
            const res = await fetch(`http://localhost:5000/properties/${user?.email}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });
    

    if(isPending){
        return 'loading......'
    }

    console.log(myProperties)
   


    return (
        <div>
            My Added Properties:{myProperties.length}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    myProperties.map((myProperty) => <MyProperty key={myProperty._id} myProperty={myProperty}></MyProperty>)
                }
            </div>
        </div>
    );
}

export default MyAddedProperties;