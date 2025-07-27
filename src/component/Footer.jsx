import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
     <footer className="bg-custom-gradient text-white py-8 z-40 relative">
      <div className=" mx-auto px-6 lg:px-14 flex flex-col lg:justify-between items-center gap-4">
        <div className="flex justify-center items-center text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2 mr-2">Shortly</h2>
          <p >Simplifying URL shortening for efficient sharing</p>
        </div>

        <p className="mt-4 lg:mt-0 ">
          &copy; 2025 Shortly. All rights reserved.
        </p>

        <div className="flex space-x-6 mt-4 lg:mt-0">
          <a href="#" className="hover:text-gray-200">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer