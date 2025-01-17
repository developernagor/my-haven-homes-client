import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

function MainLayout() {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-358px)]'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;