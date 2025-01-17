import React from 'react';

const MeetOurAgent = () => {

    const agents = [
        {
          name: 'John Doe',
          title: 'Senior Agent',
          bio: 'John has over 10 years of experience in real estate and is dedicated to helping clients find their dream homes.',
          email: 'johndoe@example.com',
          phone: '123-456-7890',
          // Uncomment if you have images
          // image: 'path/to/image.jpg',
        },
        {
          name: 'Jane Smith',
          title: 'Junior Agent',
          bio: 'Jane is passionate about real estate and specializes in luxury properties.',
          email: 'janesmith@example.com',
          phone: '987-654-3210',
          // image: 'path/to/image.jpg',
        },
        // Add more agents as needed
      ];


  return (
    <div className="px-4 py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden p-6">
            <div className="flex items-center mb-4">
              {/* Uncomment and use if you have images */}
              {/* <img
                src={agent.image}
                alt={`${agent.name}`}
                className="w-16 h-16 rounded-full object-cover mr-4"
              /> */}
              <div>
                <h3 className="text-xl font-semibold">{agent.name}</h3>
                <p className="text-gray-600 text-sm">{agent.title}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{agent.bio}</p>
            <div className="text-gray-600 text-sm">
              <p><strong>Email:</strong> {agent.email}</p>
              <p><strong>Phone:</strong> {agent.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurAgent;
