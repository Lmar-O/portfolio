import React from 'react';
import { motion } from 'framer-motion';
import type { SectionProps } from '../../types';
import './Section.css';

const Section: React.FC<SectionProps> = ({
  id,
  className = '',
  children
}) => {
  const classes = `section ${className}`.trim();

  return (
    <motion.section
      id={id}
      className={classes}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
