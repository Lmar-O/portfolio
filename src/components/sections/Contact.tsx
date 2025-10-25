import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Linkedin
} from 'lucide-react';
import Section from '../ui/Section';
import { personalInfo } from '../../data/portfolio';
import './Contact.css';

const socialIcons = {
  github: Github,
  linkedin: Linkedin
};

const Contact: React.FC = () => {

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
    <Section id="contact" className="contact">
      <motion.div
        className="contact-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Contact
        </motion.h2>

        <div className="contact-grid">
          <motion.div className="contact-info" variants={itemVariants}>
            <p className="contact-description">
              I'm always interested in new opportunities and collaborations. 
              Feel free to reach out if you'd like to work together.
            </p>
            
            <div className="contact-methods">
              <a href={`mailto:${personalInfo.email}`} className="contact-method">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </a>
            </div>

            <div className="social-links">
              {personalInfo.socialLinks.map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons];
                if (!IconComponent) return null;
                
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                  >
                    <IconComponent size={16} />
                    <span>{social.platform}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Contact;