import React from 'react';
import UserSideBar from './UserSideBar';
import { Outlet } from 'react-router-dom';

function UserDashboard() {
    return (
        <div>
            <div className='flex gap-10'>
            <div className='w-3/12'>
            <UserSideBar></UserSideBar>
            </div>
            <div className='w-9/12 border'>
            <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
}

export default UserDashboard;