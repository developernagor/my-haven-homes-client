import React from 'react';
import {useQuery} from "@tanstack/react-query"
import axios from 'axios';

const MeetOurAgent = () => {

  const {isLoading, data: agents, error} = useQuery({
    queryKey: ['agents'],
    queryFn: async() => {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/users/agent`);
      return data;
    }
  })
  if(isLoading){
    return 'loading......'
}
if (error) {
    return `Error: ${error.message}`;
}


    


  return (
    <div className="px-4 py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {agents.map((agent, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden p-6">
            <div className="flex items-center mb-4 gap-4">
              {/* Uncomment and use if you have images */}
              <div className='w-1/3'>
              <img
                src={agent.image}
                alt={`${agent.name}`}
                className="w-full h-16 rounded-full object-cover mr-4"
              />
              </div>
              <div className='w-2/3 text-start'>
                <h3 className="text-xl font-semibold">{agent.name}</h3>
                <p className="text-gray-600 text-sm">{agent.title}</p>
            <p className="text-gray-700 mb-4">{agent.bio}</p>
              <p><strong>Email:</strong> {agent.email}</p>
              <p><strong>Phone:</strong> {agent.phone}</p>
              </div>
              
            </div>
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurAgent;
