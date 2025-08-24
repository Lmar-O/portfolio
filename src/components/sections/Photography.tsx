import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mountain, Users, Building, TreePine } from 'lucide-react';
import Section from '../ui/Section';
import { photoGallery } from '../../data/portfolio';
import type { PhotoCategory } from '../../types';
import './Photography.css';

const categoryIcons = {
  all: Camera,
  portrait: Users,
  landscape: Mountain,
  street: Building,
  nature: TreePine
};

const Photography: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('all');
  
  const categories: { key: PhotoCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'portrait', label: 'Portrait' },
    { key: 'landscape', label: 'Landscape' },
    { key: 'street', label: 'Street' },
    { key: 'nature', label: 'Nature' }
  ];

  const filteredPhotos = activeCategory === 'all' 
    ? photoGallery 
    : photoGallery.filter(photo => photo.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Section id="photography" className="photography">
      <motion.div
        className="photography-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Photography Portfolio</h2>
        <p className="section-subtitle">
          Capturing moments and emotions through my lens
        </p>
      </motion.div>

      <motion.div
        className="photo-categories"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.key];
          return (
            <motion.button
              key={category.key}
              className={`category-btn ${activeCategory === category.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconComponent size={18} />
              {category.label}
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="photo-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              className="photo-item"
              variants={photoVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              layout
            >
              <div className="photo-placeholder">
                <Camera size={48} />
                <div className="photo-overlay">
                  <h4>{photo.title || 'Photo Title'}</h4>
                  <p>{photo.description || 'Photo description'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredPhotos.length === 0 && (
        <motion.div
          className="no-photos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Camera size={64} />
          <p>No photos in this category yet. More coming soon!</p>
        </motion.div>
      )}

      <motion.div
        className="photography-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p>Want to see more of my photography work?</p>
        <a href="#contact" className="cta-link">
          Get in touch for collaborations
        </a>
      </motion.div>
    </Section>
  );
};

export default Photography;
