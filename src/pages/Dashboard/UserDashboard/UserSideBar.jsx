import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function UserSideBar() {
    return (
        <div className='flex flex-col gap-2 p-4'>
            <NavLink to="/dashboard/my-profile" 
            className={({ isActive }) => 
                `btn ${isActive ? 'bg-blue-500 text-white' : ''}`
              }
            >My Profile</NavLink>
            <NavLink to="/dashboard/wishlist" 
            className={({ isActive }) => 
                `btn ${isActive ? 'bg-blue-500 text-white' : ''}`
              }
            >Wishlist</NavLink>
            <NavLink to="/dashboard/property-bought" 
            className={({ isActive }) => 
                `btn ${isActive ? 'bg-blue-500 text-white' : ''}`
              }
            >Property Bought</NavLink>
            <NavLink to="/dashboard/my-reviews" 
            className={({ isActive }) => 
                `btn ${isActive ? 'bg-blue-500 text-white' : ''}`
              }
            >My Reviews</NavLink>
            
        </div>
    );
}

export default UserSideBar;