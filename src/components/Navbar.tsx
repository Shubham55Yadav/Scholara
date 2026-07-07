// src/components/Navbar.tsx

import React, { useContext, useState, useRef, useEffect } from 'react';
import { Book, Wrench, Users, LogIn, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';
import { ThemeContext } from '../pages/ThemeContext';

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      console.error('Error signing out:', error);
      alert(error.message);
    }
  };

  // Close mobile menu if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/images/logod.png"
                alt="Scholara"
                className="h-9 w-9"
              />
              <span className="font-bold text-xl text-slate-800 dark:text-slate-100 tracking-tight font-sans">
                Scholara
              </span>
            </Link>
          </div>

          {/* Middle NavLinks: Hidden on mobile, show icons only on tablet */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <NavLink to="/resources" icon={<Book className="h-4.5 w-4.5" />} text="Resources" />
            <NavLink to="/ffcs-help" icon={<Wrench className="h-4.5 w-4.5" />} text="FFCS Help" />
            <NavLink to="/tools" icon={<Wrench className="h-4.5 w-4.5" />} text="Tools" />
            <NavLink to="/community" icon={<Users className="h-4.5 w-4.5" />} text="Community" />
          </div>

          {/* Right Section: Theme switch + Contribution + Auth (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link
              to="/make-contribution"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all shadow-sm hover:shadow-md whitespace-nowrap text-sm"
            >
              Make Contribution
            </Link>

            {user ? (
              <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-3">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium whitespace-nowrap">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-slate-800 pl-3">
                <Link
                  to="/signin"
                  className="flex items-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-sm transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1.5" />
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger + Mobile Toggle Buttons: Visible on mobile */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Theme Toggle Button for mobile view */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              className="flex items-center text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Side Drawer) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm z-50 flex">
          {/* The actual side panel */}
          <div
            ref={mobileMenuRef}
            className="bg-white dark:bg-slate-950 w-64 h-full p-6 flex flex-col shadow-2xl border-r border-slate-200 dark:border-slate-850"
          >
            {/* Top row in drawer */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-lg text-slate-800 dark:text-slate-100">
                Menu
              </span>
              <button
                className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col space-y-3 flex-1">
              <NavLink
                to="/resources"
                icon={<Book className="h-5 w-5" />}
                text="Resources"
                onClick={() => setIsMobileMenuOpen(false)}
                isMobile={true}
              />
              <NavLink
                to="/ffcs-help"
                icon={<Wrench className="h-5 w-5" />}
                text="FFCS Help"
                onClick={() => setIsMobileMenuOpen(false)}
                isMobile={true}
              />
              <NavLink
                to="/tools"
                icon={<Wrench className="h-5 w-5" />}
                text="Tools"
                onClick={() => setIsMobileMenuOpen(false)}
                isMobile={true}
              />
              <NavLink
                to="/community"
                icon={<Users className="h-5 w-5" />}
                text="Community"
                onClick={() => setIsMobileMenuOpen(false)}
                isMobile={true}
              />

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-4">
                <Link
                  to="/make-contribution"
                  className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-center transition-colors text-sm shadow-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Make Contribution
                </Link>

                {user ? (
                  <div className="flex flex-col space-y-2 pt-2">
                    <span className="text-slate-500 dark:text-slate-400 text-xs px-1">
                      Signed in as
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium px-1 truncate">
                      {user.displayName || user.email}
                    </span>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2 rounded-lg text-sm transition-colors mt-2"
                    >
                      <LogOut className="h-4.5 w-4.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signin"
                    className="flex items-center justify-center space-x-2 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="h-4.5 w-4.5" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Clicking on the backdrop closes the menu */}
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  isMobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text, onClick, isMobile }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all group ${
      isMobile
        ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-indigo-600 dark:hover:text-indigo-400'
        : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
    }`}
  >
    <span className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-colors">
      {icon}
    </span>
    {/* Show text on mobile and desktop, hide on tablet */}
    <span className={isMobile ? 'inline' : 'hidden lg:inline'}>
      {text}
    </span>
  </Link>
);

export default Navbar;

