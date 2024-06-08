import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-500 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-5 p-7">
        <div className="mb-4 md:mb-0 flex-1">
          <p>&copy; 2024 My Company. All rights reserved.</p>
          {/* <p>Contact us: <FaEnvelope /> email@example.com | <FaPhone /> +1 234 567 890</p> */}
          <p>Contact us :</p>
          <p className='flex gap-4 items-center'><FaEnvelope /> email@example.com</p>
          <p className='flex gap-4 items-center'><FaPhone /> +1 234 567 890</p>
        </div>
        <nav className="mb-4 md:mb-0 flex-1">
          <ul className="flex flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li><a href="/about" className="hover:text-white hover:scale-105 transition-all duration-300 ease-in-out">About</a></li>
            <li><a href="/contact" className="hover:text-white hover:scale-105 transition-all duration-300 ease-in-out">Contact</a></li>
            <li><a href="/faq" className="hover:text-white hover:scale-105 transition-all duration-300 ease-in-out">FAQ</a></li>
          </ul>
        </nav>
        <div className="flex space-x-4 flex-1">
          <a href="https://facebook.com" className="text-slate-500 hover:text-[#1877F2] hover:scale-105 transition-all duration-300 ease-in-out">
            <FaFacebook size="1.5em" />
          </a>
          <a href="https://twitter.com" className="text-slate-500 hover:text-[#1DA1F2] hover:scale-105 transition-all duration-300 ease-in-out">
            <FaTwitter size="1.5em" />
          </a>
          <a href="https://instagram.com" className="text-slate-500 hover:text-[#E4405F] hover:scale-105 transition-all duration-300 ease-in-out">
            <FaInstagram size="1.5em" />
          </a>
          <a href="https://linkedin.com" className="text-slate-500 hover:text-[#0A66C2] hover:scale-105 transition-all duration-300 ease-in-out">
            <FaLinkedin size="1.5em" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
