import React from 'react';

const About = () => {
  return (
    <div>
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:space-x-8">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="About Us" 
                className="rounded-lg shadow-lg" 
              />
            </div>
            {/* Text Section */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
              <p className="mt-4 text-gray-600">
                Welcome to Blogging, where we are dedicated to [your mission/vision]. With a passion for industry, we strive to  value.
              </p>
              <p className="mt-4 text-gray-600">
                Founded in 2024, we have grown into a team of 36 professionals who are committed to delivering services that exceed expectations. Our goal is to given good service.
              </p>
              <p className="mt-4 text-gray-600">
                At Blogging, we believe in innovation, integrity, customer focus. We are driven and are always looking for ways to improve and innovate.
              </p>
              <a href="/contact" className="mt-8 inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-500">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
