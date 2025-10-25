import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send,
  CheckCircle 
} from 'lucide-react';
import Section from '../ui/Section';
import { personalInfo } from '../../data/portfolio';
import type { ContactFormData } from '../../types';
import './Contact.css';

const socialIcons = {
  github: Github,
  linkedin: Linkedin
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* <motion.div className="contact-form-container" variants={itemVariants}>
            {isSubmitted ? (
              <div className="success-message">
                <CheckCircle size={24} />
                <h3>Message sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary submit-btn"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div> */}
        </div>
      </motion.div>
    </Section>
  );
};

export default Contact;