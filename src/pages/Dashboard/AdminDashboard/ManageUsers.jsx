import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

function ManageUsers() {
  
    const {isLoading, data: users, error, refetch} = useQuery({
        queryKey:['users'],
        queryFn: async()=> {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
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
    console.log(users)


    const handleMakeAdmin = user => {
      axios.patch(`${import.meta.env.VITE_API_URL}/users/admin/${user._id}`)
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
      axios.patch(`${import.meta.env.VITE_API_URL}/users/agent/${user._id}`)
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
    const handleMarkAsFraud = user => {
      axios.patch(`${import.meta.env.VITE_API_URL}/users/fraud/${user._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.result.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is marked as fraud and properties are removed!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error('Error making user as fraud:', error);
      });
    };


    

    const handleDeleteUser = id => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this",
        position: "top-end",
        icon: "warning",
        showCancelButton:true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor:"#d33",
        showConfirmButton: true,
        confirmButtonText:"Yes, delete it!",
      }).then((result) => {
        if(result.isConfirmed) {
          axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`)
          .then(res => {
            if(res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Deleted",
                text:"User has been deleted",
                timer: 1500
              });

            }
          })
        }
      })     
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
          
            <tr key={user._id}>
        <th>{index+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td className=''> {
          user.role === 'fraud' ? (
            <div className='text-center'>
              <span className="text-red-500 text-xl font-semibold">Fraud</span>
            </div>
          ) :
          user.role === 'admin' ? <p className='text-center font-semibold text-2xl'>admin</p> : <button onClick={()=> handleMakeAdmin(user)} className='btn bg-green-500 text-white'>Make Admin</button>} </td>
        <td>
           {
            user.role === 'fraud' ? (
              <div className='text-center'>
              <span className="text-red-500 text-xl font-semibold">Fraud</span>
            </div>
            ) : user.role === 'agent' ? (
              <button onClick={() => handleMarkAsFraud(user)} className="btn bg-blue-500 text-white">
      Mark as Fraud
    </button>
            ) : (
              <button onClick={() => handleMakeAgent(user)} className="btn bg-blue-500 text-white">
      Make Agent
    </button>
            )
           }
            
        </td>
        <td className=''> <button onClick={() => handleDeleteUser(user._id)} className='btn bg-red-500 text-white'>Delete</button> </td>
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