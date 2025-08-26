import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import { personalInfo, aboutText } from '../../data/portfolio';
import './About.css';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Section id="about" className="about">
      <motion.div
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          About
        </motion.h2>

        <div className="about-grid">
          <motion.div className="about-text" variants={itemVariants}>
            <p className="about-paragraph">{aboutText.introduction}</p>
            <p className="about-paragraph">{aboutText.journey}</p>
            <p className="about-paragraph">{aboutText.philosophy}</p>
          </motion.div>

          <motion.div className="about-skills" variants={itemVariants}>
            <h3 className="skills-title">Technologies</h3>
            <div className="skills-list">
              {personalInfo.skills.map((skill) => (
                <span key={skill.name} className="skill-tag">
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default About;