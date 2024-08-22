import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="lg:flex lg:justify-between">
          {/* Company Info */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="text-xl font-bold mb-4">Your Company</h2>
            <p className="text-gray-400">
              We are committed to delivering the best products and services to our customers. Your satisfaction is our priority.
            </p>
            <p className="text-gray-400 mt-4">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-300">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-300">About Us</a>
              </li>
              <li>
                <a href="/services" className="hover:text-gray-300">Services</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Contact Us</a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="lg:w-1/3">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.284h-3.125v-3.622h3.125v-2.672c0-3.1 1.893-4.788 4.656-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.919.001c-1.504 0-1.795.714-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.284h6.116c.731 0 1.324-.593 1.324-1.324v-21.351c0-.732-.593-1.325-1.324-1.325z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.956-2.173-1.555-3.591-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .385.045.76.127 1.122-4.09-.205-7.719-2.166-10.148-5.144-.424.729-.667 1.576-.667 2.476 0 1.708.869 3.213 2.19 4.099-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.698 4.374 3.951 4.827-.414.112-.849.171-1.296.171-.317 0-.626-.031-.927-.088.627 1.955 2.444 3.379 4.599 3.417-1.68 1.317-3.808 2.104-6.115 2.104-.398 0-.79-.023-1.175-.069 2.179 1.396 4.768 2.21 7.548 2.21 9.057 0 14.009-7.506 14.009-14.01 0-.213-.005-.426-.014-.637.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.23 0h-20.46c-.974 0-1.77.797-1.77 1.77v20.46c0 .974.796 1.77 1.77 1.77h20.46c.973 0 1.77-.796 1.77-1.77v-20.46c0-.973-.797-1.77-1.77-1.77zm-14.769 20.451h-3.261v-11.906h3.261v11.906zm-1.631-13.495c-1.04 0-1.882-.842-1.882-1.882 0-1.041.842-1.882 1.882-1.882 1.04 0 1.882.841 1.882 1.882 0 1.04-.842 1.882-1.882 1.882zm13.075 13.495h-3.263v-5.938c0-1.413-.029-3.228-1.968-3.228-1.97 0-2.272 1.54-2.272 3.125v6.041h-3.264v-11.906h3.132v1.625h.044c.436-.825 1.503-1.693 3.094-1.693 3.309 0 3.92 2.178 3.92 5.008v6.966z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.527.067-2.86.36-3.886 1.386-1.026 1.026-1.319 2.359-1.386 3.886-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.067 1.527.36 2.86 1.386 3.886 1.026 1.026 2.359 1.319 3.886 1.386 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.527-.067 2.86-.36 3.886-1.386 1.026-1.026 1.319-2.359 1.386-3.886.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.067-1.527-.36-2.86-1.386-3.886-1.026-1.026-2.359-1.319-3.886-1.386-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.163 2.76-6.163 6.163s2.76 6.163 6.163 6.163 6.163-2.76 6.163-6.163-2.76-6.163-6.163-6.163zm0 10.163c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm6.406-11.845c-.796 0-1.442-.646-1.442-1.442s.646-1.442 1.442-1.442 1.442.646 1.442 1.442-.646 1.442-1.442 1.442z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
