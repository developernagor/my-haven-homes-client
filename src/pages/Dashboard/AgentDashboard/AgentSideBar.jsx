import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function AgentSideBar() {
    return (
        <div className='flex flex-col gap-2 p-4'>
            <NavLink to="/dashboard/agent-profile" className={({ isActive }) =>
          isActive ? "bg-gray-500 text-white text-center px-3 py-1 rounded-lg" : "text-center px-3 py-1"
        }>Agent Profile</NavLink>
            <NavLink to="/dashboard/add-property" className={({ isActive }) =>
          isActive ? "bg-gray-500 text-white text-center px-3 py-1 rounded-lg" : "text-center px-3 py-1"
        }>Add Property</NavLink>
            <NavLink to="/dashboard/my-added-properties" className={({ isActive }) =>
          isActive ? "bg-gray-500 text-white text-center px-3 py-1 rounded-lg" : "text-center px-3 py-1"
        }>My Added Properties</NavLink>
            <NavLink to="/dashboard/my-sold-properties" className={({ isActive }) =>
          isActive ? "bg-gray-500 text-white text-center px-3 py-1 rounded-lg" : "text-center px-3 py-1"
        }>My Sold Properties</NavLink>
            <NavLink to="/dashboard/requested-properties" className={({ isActive }) =>
          isActive ? "bg-gray-500 text-white text-center px-3 py-1 rounded-lg" : "text-center px-3 py-1"
        }>Requested Properties</NavLink>
            
        </div>
    );
}

export default AgentSideBar;