import React, { useState } from 'react';
import { NavLink } from 'react-router';
// Optional: If you have lucide-react installed for icons
// import { Menu, X } from 'lucide-react'; 

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Reusable NavLink style logic
  const linkStyles = ({ isActive }) =>
    `transition-all duration-300 px-4 py-2 rounded-lg ${
      isActive 
        ? "bg-white text-blue-600 shadow-sm" 
        : "text-white hover:bg-blue-300"
    }`;

  return (
    <nav className="bg-blue-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img 
              width="50px" 
              className="rounded-full bg-white p-1" 
              src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg" 
              alt="logo" 
            />
            <span className="text-white font-black text-2xl tracking-tight hidden sm:block">
              BlogApp
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-4 font-bold text-lg">
            <li><NavLink className={linkStyles} to="/">Home</NavLink></li>
            <li><NavLink className={linkStyles} to="/register">Register</NavLink></li>
            <li><NavLink className={linkStyles} to="/login">Login</NavLink></li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none p-2 rounded-md hover:bg-blue-400 transition-colors"
            >
              {/* Simple SVG Hamburger / X Icon */}
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="px-4 pt-2 pb-6 space-y-2 bg-blue-600 shadow-inner">
          <li>
            <NavLink onClick={() => setIsOpen(false)} className="block py-3 px-4 text-white font-bold rounded-lg hover:bg-blue-500" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setIsOpen(false)} className="block py-3 px-4 text-white font-bold rounded-lg hover:bg-blue-500" to="/register">
              Register
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setIsOpen(false)} className="block py-3 px-4 text-white font-bold rounded-lg hover:bg-blue-500" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;