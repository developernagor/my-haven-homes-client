import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

function ManageUsers() {

    const {isLoading, data: users, error, refetch} = useQuery({
        queryKey:['users'],
        queryFn: async()=> {
            const res = await fetch('http://localhost:5000/users');
            console.log(res)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    })
    if(isLoading){
        return 'loading......'
    }
    if (error) {
        return `Error: ${error.message}`;
    }


    const handleMakeAdmin = user => {
      axios.patch(`http://localhost:5000/users/admin/${user._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an admin now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error('Error making user admin:', error);
      });
    };
    const handleMakeAgent = user => {
      axios.patch(`http://localhost:5000/users/agent/${user._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is a agent now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error('Error making user agent:', error);
      });
    };

    

    const handleDeleteUser = id => {

    }
    return (
        <div>
            Manage Users:{users.length}
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Agent/Fraud</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((user,index)=>
            <tr>
        <th>{index+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td className=''> {
          user.role === 'admin' ? <p className='text-center font-semibold text-2xl'>admin</p> : <button onClick={()=> handleMakeAdmin(user)} className='btn bg-green-500 text-white'>Make Admin</button>} </td>
        <td>
           
            {
                user.role === 'agent' ? <button className='btn bg-blue-500 text-white'>Mark as Fraud</button> : <button onClick={() => handleMakeAgent(user)} className='btn bg-blue-500 text-white'>Make Agent</button>
            }
        </td>
        <td className=''> <button className='btn bg-red-500 text-white'>Delete</button> </td>
      </tr>
        )
      }
      
      
      
    </tbody>
  </table>
</div>
        </div>
    );
}

export default ManageUsers;