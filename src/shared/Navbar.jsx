import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.png'

function Navbar() {

    const links = <>
    <Link to="/"><li className=''>Home</li></Link>
    <Link to="/all-properties"><li className=''>All Properties</li></Link>
    <Link to="/dashboard"><li className=''>Dashboard</li></Link>
    </>



    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-4">
        {links}
      </ul>
    </div>
    <Link to='/'><img src={logo} alt="" /></Link>
    <Link to='/' className='text-2xl ml-4'>Haven Homes</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-6">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    <Link to="/login"><button className='btn'>Login</button></Link>
  </div>
</div>
    );
}

export default Navbar;