import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, User } from 'lucide-react';
import Button from '../ui/Button';
import { personalInfo } from '../../data/portfolio';
import './Hero.css';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.h1 className="hero-title" variants={itemVariants}>
            Hi, I'm{' '}
            <span className="highlight">{personalInfo.name}</span>
          </motion.h1>
          
          <motion.h2 className="hero-subtitle" variants={itemVariants}>
            {personalInfo.title}
          </motion.h2>
          
          <motion.p className="hero-description" variants={itemVariants}>
            {personalInfo.description}
          </motion.p>
          
          <motion.div className="hero-buttons" variants={itemVariants}>
            <Button href="#projects" variant="primary">
              View My Work
            </Button>
            <Button href="#contact" variant="secondary">
              Get In Touch
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="hero-image"
          variants={imageVariants}
        >
          <div className="profile-circle">
            <div className="profile-placeholder">
              <User size={120} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
