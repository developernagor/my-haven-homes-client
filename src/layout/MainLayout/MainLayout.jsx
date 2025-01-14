import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

function MainLayout() {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;