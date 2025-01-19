import React from 'react';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div className='flex gap-10'>
            <div className='w-3/12'>
            <AdminSidebar></AdminSidebar>
            </div>
            <div className='w-9/12 border'>
            <Outlet></Outlet>
            </div>
        </div>
    );
}

export default AdminDashboard;