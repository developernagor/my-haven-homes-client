import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/favicon.png'
import { AuthContext } from '../providers/AuthProvider';

function Navbar() {

    const links = <>
    <NavLink to="/" className={({ isActive }) =>
          isActive ? "bg-gray-200 px-3 py-1 rounded-lg" : "px-3 py-1"
        }><li className=''>Home</li></NavLink>
    <NavLink to="/all-properties" className={({ isActive }) =>
          isActive ? "bg-gray-200 px-3 py-1 rounded-lg" : "px-3 py-1"
        }><li className=''>All Properties</li></NavLink>

    <NavLink to="/dashboard" className={({ isActive }) =>
          isActive ? "bg-gray-200 px-3 py-1 rounded-lg" : "px-3 py-1"
        }><li className=''>Dashboard</li></NavLink>
        
    </>

    const {user, signOutUser} = useContext(AuthContext);
    console.log(user)

    // const {email, displayName} = user;
    // console.log(email, displayName)
    const navigate = useNavigate();

    const handleLogOut = () => {
      signOutUser()
          .then(() => {
              console.log('successful sign out')
              navigate('/login')
          })
          .catch(error => {
              console.log('failed to sign out .stay here. dont leave me alone')
          })
  }



    return (
        <div className="navbar justify-between bg-white sticky top-0 z-10 px-10 ">
  <div className="">

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

    <Link to='/'><img src={logo} alt="" className='hidden lg:block' /></Link>
    <Link to='/' className='text-2xl font-semibold lg:ml-4'>Haven Homes</Link>
  </div>

  <div className=" hidden md:flex">
    <ul className="menu menu-horizontal px-1 gap-2 md:gap-2 lg:gap-6">
      {links}
    </ul>
  </div>
  <div className="">
  {user ? (
          <div className="flex items-center gap-3">
            <div className="tooltip" data-tip={user?.displayName || "User"}>
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt={`Avatar of ${user?.displayName || "default user"}`}
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </div>
            <button
              onClick={handleLogOut}
              className="border rounded-lg px-4 py-1 bg-purple-600 text-white font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="border rounded-lg px-4 py-1 bg-purple-600 text-white font-semibold"
          >
            Login
          </Link>
        )}
  </div>
</div>
    );
}

export default Navbar;