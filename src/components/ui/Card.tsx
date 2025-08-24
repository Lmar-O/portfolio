import React from 'react';
import { motion } from 'framer-motion';
import type { CardProps } from '../../types';
import './Card.css';

const Card: React.FC<CardProps> = ({
  className = '',
  children,
  hover = true
}) => {
  const classes = `card ${className}`.trim();

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={hover ? { y: -5 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;
