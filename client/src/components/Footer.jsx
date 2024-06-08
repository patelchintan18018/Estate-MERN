import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-slate-500 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2024 My Company. All rights reserved.</p>
          {/* <p>Contact us: <FaEnvelope /> email@example.com | <FaPhone /> +1 234 567 890</p> */}
          <p>Contact us :</p>
          <p className='flex gap-4 items-center'><FaEnvelope /> email@example.com</p>
          <p className='flex gap-4 items-center'><FaPhone /> +1 234 567 890</p>
        </div>
        <nav className="mb-4 md:mb-0">
          <ul className="flex flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
          </ul>
        </nav>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-white hover:text-gray-400">
            <FaFacebook size="1.5em" />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-gray-400">
            <FaTwitter size="1.5em" />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-gray-400">
            <FaInstagram size="1.5em" />
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-gray-400">
            <FaLinkedin size="1.5em" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
