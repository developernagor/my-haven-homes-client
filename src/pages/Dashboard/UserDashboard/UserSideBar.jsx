import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function UserSideBar() {
    return (
        <div className='flex flex-col gap-2 p-4'>
            <NavLink to="/dashboard/my-profile" className='btn'>My Profile</NavLink>
            <NavLink to="/dashboard/wishlist" className='btn'>Wishlist</NavLink>
            <NavLink to="/dashboard/property-bought" className='btn'>Property Bought</NavLink>
            <NavLink to="/dashboard/my-reviews" className='btn'>My Reviews</NavLink>
            
        </div>
    );
}

export default UserSideBar;