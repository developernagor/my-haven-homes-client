import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function AgentSideBar() {
    return (
        <div className='flex flex-col gap-2 p-4'>
            <NavLink to="/dashboard/agent-profile" className='btn'>Agent Profile</NavLink>
            <NavLink to="/dashboard/add-property" className='btn'>Add Property</NavLink>
            <NavLink to="/dashboard/my-added-properties" className='btn'>My Added Properties</NavLink>
            <NavLink to="/dashboard/my-sold-properties" className='btn'>My Sold Properties</NavLink>
            <NavLink to="/dashboard/requested-properties" className='btn'>Requested Properties</NavLink>
            
        </div>
    );
}

export default AgentSideBar;