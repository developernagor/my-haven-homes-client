import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

function MyProfile() {
    const { user } = useContext(AuthContext);
    const {displayName,
        email,
        photoURL,
        timestamp
    } = user; // Access user info from context

    if (!user) {
        return <div>Loading user information...</div>;
    }

    const joinedDate = Date(timestamp).toLocaleString() ;
       
    return (
        <div className="profile-container">
            <h1>My Profile</h1>
            <div className="profile-info">
                <img src={user.photoURL} alt={`${displayName}'s profile`} className="profile-image w-[400px] rounded-2xl mb-4 mx-auto" />
                <h2 className='text-3xl'>Name: {displayName}</h2>
                {user.role && user.role !== 'regular' && <p>Role: {user.role}</p>}
                {/* Add more user information here if needed */}
                <p className='text-2xl mb-2'>Email: {email}</p>
                <p className='text-xl mb-2'>Joined: {joinedDate || 'No date available'}</p>
            </div>
        </div>
    );
}

export default MyProfile;
