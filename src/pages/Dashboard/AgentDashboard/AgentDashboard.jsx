import React from 'react';
import { Outlet } from 'react-router-dom';
import AgentSideBar from './AgentSideBar';

function AgentDashboard() {
    return (
        <div className='flex gap-10'>
            <div className='w-3/12'>
            <AgentSideBar></AgentSideBar>
            </div>
            <div className='w-9/12 border'>
            <Outlet></Outlet>
            </div>
        </div>
    );
}

export default AgentDashboard;