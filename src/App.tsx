import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Photography from './components/sections/Photography';
import Contact from './components/sections/Contact';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <About />
        <Projects />
        <Photography />
        <Contact />
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default App;