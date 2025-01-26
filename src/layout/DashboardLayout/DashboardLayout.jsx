import React from 'react';
import AgentSideBar from '../../pages/Dashboard/AgentDashboard/AgentSideBar';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard/Dashboard';

function DashboardLayout() {
    return (
        <div className='flex gap-10'>
            <div className='w-3/12'>
            <Dashboard></Dashboard>
            </div>
            <div className='w-9/12'>
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default DashboardLayout;