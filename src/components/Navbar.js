import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMenu3Line } from 'react-icons/ri';
import LogoutLogic from '../Logic/UserLogic.js/Logout.logic';
import Brand from './Brand';
import { motion, AnimatePresence } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Define searchQuery and setSearchQuery here
  const [navData, setNavData] = useState([]);
  let token = localStorage.getItem('token');
  const { logout } = LogoutLogic();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setNavData([
      { title: 'Explore', link: '/explore', show: true },
      { title: 'Dashboard', link: '/dashboard', show: !!token },
      { title: 'Login', link: '/auth/login', show: !token },
      { title: 'Signup', link: '/auth/signup', show: !token },
    ]);
  }, [token]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 border-b-2 border-gray-200 ${isScrolled ? 'bg-white/60 backdrop-blur-sm shadow-lg' : ''}`}
    >
      <nav className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-indigo-900 hover:scale-105 transition-transform"
          >
            <motion.div
              initial={{ rotateX: -90 }}
              animate={{ rotateX: 0 }}
              transition={{ duration: 0.5 }}
              className="transform-3d"
            >
              <Brand />
            </motion.div>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {/* Custom Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Navigation Links */}
            {navData.map(
              (item, index) =>
                item.show && (
                  <NavLink
                    key={index}
                    to={item.link}
                    className={
                      item.title === 'Signup'
                        ? 'bg-indigo-600 text-white px-4 py-2 rounded-2xl hover:bg-indigo-700 transition-all hover:scale-105'
                        : 'hover:text-indigo-500'
                    }
                  >
                    {item.title}
                  </NavLink>
                )
            )}

            {/* Logout Button */}
            {token && (
              <button onClick={logout} className="hover:text-red-500">
                Logout
              </button>
            )}

            {/* Sign Up Button */}
            {/* <NavLink
              to="/auth/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-2xl hover:bg-indigo-700 transition-all hover:scale-105"
            >
              Sign Up
            </NavLink> */}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            {toggleMenu ? (
              <RxCross2 className="h-6 w-6" />
            ) : (
              <RiMenu3Line size={24} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gradient-to-br from-purple-50 to-indigo-100 backdrop-blur-md shadow-lg"
          >
            <div className="container mx-auto px-6 py-3 flex flex-col space-y-6">
              {/* Mobile Search Bar */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Navigation Links for Mobile */}
              {navData.map(
                (item, index) =>
                  item.show && (
                    <NavLink
                      key={index}
                      to={item.link}
                      onClick={() => setToggleMenu(false)}
                      className="hover:text-indigo-500 text-center"
                    >
                      {item.title}
                    </NavLink>
                  )
              )}

              {/* Logout Button for Mobile */}
              {token && (
                <button
                  onClick={() => {
                    logout();
                    setToggleMenu(false);
                  }}
                  className="text-center text-red-500"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
