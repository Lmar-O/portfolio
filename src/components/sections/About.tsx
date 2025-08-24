import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Camera, 
  Globe, 
  Database, 
  GitBranch
} from 'lucide-react';
import Section from '../ui/Section';
import { personalInfo, aboutText, stats } from '../../data/portfolio';
import './About.css';

const skillIcons = {
  javascript: Code2,
  typescript: Code2,
  react: Globe,
  python: Code2,
  html: Globe,
  git: GitBranch,
  camera: Camera,
  nodejs: Database,
  photography: Camera
};

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
      transition: { duration: 0.6 }
    }
  };

  return (
    <Section id="about" className="about">
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">About Me</h2>
      </motion.div>

      <div className="about-content">
        <motion.div
          className="about-text"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p className="about-description" variants={itemVariants}>
            {aboutText.introduction}
          </motion.p>
          
          <motion.p className="about-description" variants={itemVariants}>
            {aboutText.journey}
          </motion.p>
          
          <motion.p className="about-description" variants={itemVariants}>
            {aboutText.philosophy}
          </motion.p>

          <motion.div className="skills" variants={itemVariants}>
            <h3>Skills & Technologies</h3>
            <div className="skills-grid">
              {personalInfo.skills.map((skill, index) => {
                const IconComponent = skillIcons[skill.icon as keyof typeof skillIcons] || Code2;
                return (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    viewport={{ once: true }}
                  >
                    <IconComponent size={32} />
                    <span>{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
