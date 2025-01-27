import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('All fields are required.');
      return;
    }



    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user-message`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        setSuccess('Message sent successfully.')
      } catch (error) {
        console.error("Error submitting form:", error);
        setError('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    // For demonstration, we'll just log the data to the console.
    // console.log('Form data submitted:', formData);

    
  };

  return (
    <div className="px-4 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {
        success && <p className='text-green-500'>{success}</p>
      }
    </div>
  );
};

export default ContactForm;
