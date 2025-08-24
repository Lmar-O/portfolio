import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Laptop } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { projects } from '../../data/portfolio';
import './Projects.css';

const Projects: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Section id="projects" className="projects">
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Software Projects</h2>
        <p className="section-subtitle">
          Showcasing my development journey and learning experiences
        </p>
      </motion.div>

      <motion.div
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={cardVariants}>
            <Card className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  {project.featured ? (
                    <Laptop size={48} />
                  ) : (
                    <Code2 size={48} />
                  )}
                </div>
                {project.featured && (
                  <div className="featured-badge">Featured</div>
                )}
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.githubUrl && (
                    <Button
                      href={project.githubUrl}
                      variant="outline"
                      size="sm"
                      className="project-link"
                    >
                      <Github size={16} />
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      href={project.liveUrl}
                      variant="primary"
                      size="sm"
                      className="project-link"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </Button>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
                    <Button
                      href="#contact"
                      variant="outline"
                      size="sm"
                      className="project-link"
                    >
                      In Progress
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="projects-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p>More projects coming soon as I continue my development journey!</p>
        <Button href="#contact" variant="primary">
          Let's Collaborate
        </Button>
      </motion.div>
    </Section>
  );
};

export default Projects;
