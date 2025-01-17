import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import MyProperty from './MyProperty';

function MyAddedProperties() {
    const {user} = useContext(AuthContext)
    console.log(user)
    const [myProperties, setMyProperties] = useState([])
    const {isPending, data} = useQuery({
        queryKey: ['myProperties'],
        queryFn: async()=> {
            const res = await fetch(`http://localhost:5000/properties/${user?.email}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            setMyProperties(data)
            return res.json();
        }
    });
    

    if(isPending){
        return 'loading......'
    }

    console.log(myProperties)

    const handleDelete = async (propertyId) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
          try {
            const response = await fetch(`http://localhost:5000/properties/${propertyId}`, { method: "DELETE" });
            if (!response.ok) {
              throw new Error("Failed to delete the property");
            }
            setMyProperties((prev) => prev.filter((property) => property._id !== propertyId));
            alert("Property deleted successfully.");
          } catch (error) {
            alert("Error: " + error.message);
          }
        }
      };
   


    return (
        <div>
            My Added Properties:{myProperties.length}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    myProperties.map((myProperty) => <MyProperty key={myProperty._id} myProperty={myProperty} handleDelete={handleDelete}></MyProperty>)
                }
            </div>
        </div>
    );
}

export default MyAddedProperties;