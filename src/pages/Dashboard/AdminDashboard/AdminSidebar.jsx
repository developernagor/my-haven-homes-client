import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
    return (
        <div className='flex flex-col gap-2 p-4'>
            <NavLink to="/dashboard/admin-profile" className={({ isActive }) =>
          isActive ? "bg-gray-500 text-white text-center px-3 py-1 rounded-lg" : "text-center px-3 py-1"
        }>Admin Profile</NavLink>
            <NavLink to="/dashboard/manage-properties" className={({ isActive }) =>
          isActive ? "bg-gray-500 text-white text-center px-3 py-1 rounded-lg" : "text-center px-3 py-1"
        }>Manage Property</NavLink>
            <NavLink to="/dashboard/manage-users" className={({ isActive }) =>
          isActive ? "bg-gray-500 text-white text-center px-3 py-1 rounded-lg" : "text-center px-3 py-1"
        }>Manage Users</NavLink>
            <NavLink to="/dashboard/manage-reviews" className={({ isActive }) =>
          isActive ? "bg-gray-500 text-white text-center px-3 py-1 rounded-lg" : "text-center px-3 py-1"
        }>Manage Reviews</NavLink>
            
            
        </div>
    );
}

export default AdminSidebar;