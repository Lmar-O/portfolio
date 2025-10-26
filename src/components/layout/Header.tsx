import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Sun, Moon } from 'lucide-react';
import { navigationItems, personalInfo } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <motion.header
        className={`header ${isScrolled ? 'header-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-container">
        {/* Left section - Logo */}
        <div className="header-left">
          <motion.a
            href="#home"
            className="logo"
            onClick={() => handleLinkClick('#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lmar Oria
          </motion.a>
        </div>

        {/* Center Navigation */}
        <nav className="nav-desktop">
          {navigationItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              className="nav-link"
              onClick={() => handleLinkClick(item.href)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right Social Icons */}
        <div className="header-right">
          <div className="social-icons">
            {personalInfo.socialLinks.map((link) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {getSocialIcon(link.icon)}
              </motion.a>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="theme-toggle"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <motion.div 
                className="theme-toggle-track"
                animate={{ 
                  backgroundColor: theme === 'dark' ? '#334155' : '#e2e8f0' 
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="theme-toggle-thumb"
                  animate={{ 
                    x: theme === 'dark' ? 20 : 0 
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {theme === 'light' ? <Sun size={14} /> : <Moon size={14} />}
                </motion.div>
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="nav-mobile"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className="nav-link-mobile"
                  onClick={() => handleLinkClick(item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
              
              {/* Social links in mobile menu */}
              <div className="social-icons-mobile">
                {personalInfo.socialLinks.map((link) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-mobile"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigationItems.length * 0.1 + 0.1 }}
                  >
                    {getSocialIcon(link.icon)}
                    <span>{link.platform}</span>
                  </motion.a>
                ))}
                
                {/* Theme Toggle in mobile menu */}
                <motion.div
                  className="theme-toggle-mobile-wrapper"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigationItems.length * 0.1 + 0.2 }}
                >
                  <button
                    onClick={toggleTheme}
                    className="theme-toggle-mobile"
                    aria-label="Toggle theme"
                  >
                    <motion.div 
                      className="theme-toggle-track"
                      animate={{ 
                        backgroundColor: theme === 'dark' ? '#334155' : '#e2e8f0' 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="theme-toggle-thumb"
                        animate={{ 
                          x: theme === 'dark' ? 20 : 0 
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {theme === 'light' ? <Sun size={14} /> : <Moon size={14} />}
                      </motion.div>
                    </motion.div>
                    <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
    </>
  );
};

export default Header;
