import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">About Us</h3>
            <p className="text-sm">
              Welcome to our website! We are dedicated to providing the best services and properties to meet your needs. Our team of experts is here to help you every step of the way.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <p className="text-sm">123 Main Street, City, Country</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: jarin@gmail.com</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:flex-col space-x-4">
              <a href="" className="hover:text-white"><i className="fab fa-facebook-f"></i> Facebook</a>
              <a href="" className="hover:text-white"><i className="fab fa-twitter"></i> Twitter</a>
              <a href="" className="hover:text-white"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
              <a href="" className="hover:text-white"><i className="fab fa-instagram"></i> Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm">
          &copy; {new Date().getFullYear()} haven-homes. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
