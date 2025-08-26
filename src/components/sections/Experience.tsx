import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import { experience } from '../../data/portfolio';
import './Experience.css';

const Experience: React.FC = () => {
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
    <Section id="experience" className="experience">
      <motion.div
        className="experience-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Experience
        </motion.h2>

        <div className="experience-list">
          {experience.map((exp) => (
            <motion.div key={exp.id} className="experience-item" variants={itemVariants}>
              <div className="experience-content-item">
                <div className="experience-header">
                  <h3 className="experience-position">{exp.position}</h3>
                  <span className="experience-duration">{exp.duration}</span>
                </div>
                
                <h4 className="experience-company">{exp.company}</h4>
                <p className="experience-description">{exp.description}</p>

                <div className="experience-technologies">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-item">
                      {tech}
                    </span>
                  ))}
                </div>

                {exp.achievements && (
                  <div className="experience-achievements">
                    <ul className="achievements-list">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="achievement-item">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Experience;