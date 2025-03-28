import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const NavLink = ({ href, children, darkMode, onClick }) => {
  return (
    <motion.a 
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative group hover:text-blue-500 transition-colors duration-300 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}
    >
      {children}
      <motion.span 
        className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
          darkMode ? 'bg-blue-400' : 'bg-blue-500'
        } group-hover:w-full transition-all duration-300`}
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
      />
    </motion.a>
  );
};

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
      
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#contact', label: 'Contact', id: 'contact' }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-20 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} dark:bg-gray-800 dark:text-white shadow-md`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.a 
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-bold"
            onClick={(e) => smoothScroll(e, 'home')}
          >
            My Portfolio
          </motion.a>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="p-2 rounded-md focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink 
                key={link.id}
                href={link.href}
                darkMode={darkMode}
                onClick={(e) => smoothScroll(e, link.id)}
              >
                {link.label}
              </NavLink>
            ))}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} dark:bg-gray-700 dark:text-yellow-300`}
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2 py-2 space-y-2"
            >
              {navLinks.map((link) => (
                <motion.a 
                  key={link.id}
                  href={link.href}
                  onClick={(e) => smoothScroll(e, link.id)}
                  whileTap={{ scale: 0.95 }}
                  className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="px-3 py-2">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} dark:bg-gray-700 dark:text-yellow-300`}
                >
                  {darkMode ? '☀️' : '🌙'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;