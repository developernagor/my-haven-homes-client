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
            <h1 className='text-3xl font-bold py-8 text-center'>Welcome to your profile!</h1>
            <div className="profile-info flex items-center gap-8">
                <img src={user.photoURL} alt={`${displayName}'s profile`} className="profile-image w-[400px] rounded-2xl mb-4 mx-auto" />
                <div>
                <h2 className='text-3xl'>Name: {displayName}</h2>
                {user.role && user.role !== 'regular' && <p>Role: {user.role}</p>}
                {/* Add more user information here if needed */}
                <p className='text-2xl mb-2'>Email: {email}</p>
                <p className='text-xl mb-2'>Joined: {joinedDate || 'No date available'}</p>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
