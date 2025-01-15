import React, { useContext } from 'react';
import AgentDashboard from './AgentDashboard/AgentDashboard';
import UserDashboard from './UserDashboard/UserDashboard'
import { useQuery } from '@tanstack/react-query';
import AdminDashboard from './AdminDashboard/AdminDashboard'
import { AuthContext } from '../../providers/AuthProvider';


function Dashboard() {
    const {user: loginUser} = useContext(AuthContext);
    console.log(loginUser)
    

    const {isPending, data: users} = useQuery({
        queryKey: ['users'],
        queryFn: async()=> {
            const res = await fetch('http://localhost:5000/users');
            return res.json();
        }
    })
    console.log(users)

    if(isPending){
        return 'loading......'
    }



    return (
        <div>
            {users.map((user) => {
                console.log(user)
                if (loginUser?.email == user?.email && user.role === 'customer') {
                    return <UserDashboard key={user._id} user={user} />;
                } else if (loginUser?.email == user?.email && user.role === 'agent') {
                    return <AgentDashboard key={user._id} user={user} />;
                } else if (loginUser?.email == user?.email && user.role === 'admin') {
                    return <AdminDashboard key={user._id} user={user} />;
                } else {
                    return null;
                }
            })}
        </div>
    );
}

export default Dashboard;