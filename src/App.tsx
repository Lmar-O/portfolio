import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
// import Experience from './components/sections/Experience'; // TODO: Gain some experience lmao
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import './App.css';

const App: React.FC = () => {
  const [blobPosition, setBlobPosition] = useState({ top: window.innerHeight * 0.25, left: 80 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const basePositionRef = React.useRef({ top: window.innerHeight * 0.25, left: 80 });
  const animationFrameRef = React.useRef<number>();

  // Calculate base position based on scroll
  const updateBasePosition = React.useCallback(() => {
    const sections = [
      { id: 'home', side: 'right', targetLeft: 75 },
      { id: 'about', side: 'left', targetLeft: 15 },
      { id: 'projects', side: 'right', targetLeft: 75 },
      { id: 'contact', side: 'left', targetLeft: 15 }
    ];

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = 0; i < sections.length; i++) {
      const section = document.getElementById(sections[i].id);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const sectionProgress = (scrollPosition - sectionTop) / section.offsetHeight;
          const verticalPosition = sectionTop + (section.offsetHeight * sectionProgress);
          
          const currentSection = sections[i];
          const nextSection = sections[i + 1];
          
          let horizontalPosition = currentSection.targetLeft;
          
          if (nextSection && sectionProgress > 0.5) {
            const transitionProgress = (sectionProgress - 0.5) * 2;
            const startPos = currentSection.targetLeft;
            const endPos = nextSection.targetLeft;
            
            const arcIntensity = Math.sin(transitionProgress * Math.PI);
            const horizontalDelta = (endPos - startPos) * transitionProgress;
            const arcOffset = arcIntensity * 10;
            
            horizontalPosition = startPos + horizontalDelta + (endPos > startPos ? arcOffset : -arcOffset);
          }

          basePositionRef.current = {
            top: verticalPosition,
            left: horizontalPosition
          };
          break;
        }
      }
    }
  }, []);

  // Apply mouse repulsion to base position with idle animation
  const applyMouseRepulsion = React.useCallback(() => {
    const basePos = basePositionRef.current;
    const blobX = (basePos.left / 100) * window.innerWidth;
    const blobY = basePos.top;
    
    const dx = mousePosition.x - blobX;
    const dy = mousePosition.y - blobY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const repelRadius = 50; // Only repel within 50px
    let offsetX = 0;
    let offsetY = 0;
    
    if (distance < repelRadius && distance > 0) {
      // Strong repulsion when very close
      const normalizedDistance = distance / repelRadius;
      const repelStrength = (1 - normalizedDistance) * 400; // Strong push when close
      
      offsetX = -(dx / distance) * repelStrength;
      offsetY = -(dy / distance) * repelStrength;
    }

    // Add gentle idle animation (figure-8 pattern) - increased amplitude
    const time = Date.now() / 1000; // Convert to seconds
    const idleOffsetX = Math.sin(time * 0.4) * 30; // Horizontal movement - doubled
    const idleOffsetY = Math.sin(time * 0.25) * 20; // Vertical movement - doubled

    setBlobPosition({
      top: basePos.top + offsetY + idleOffsetY,
      left: basePos.left + (offsetX / window.innerWidth) * 100 + (idleOffsetX / window.innerWidth) * 100
    });
  }, [mousePosition]);

  useEffect(() => {
    const handleScroll = () => {
      updateBasePosition();
      applyMouseRepulsion();
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateBasePosition, applyMouseRepulsion]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY + window.scrollY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Apply repulsion when mouse moves
  useEffect(() => {
    applyMouseRepulsion();
  }, [mousePosition, applyMouseRepulsion]);

  // Continuous idle animation loop
  useEffect(() => {
    const animate = () => {
      applyMouseRepulsion();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [applyMouseRepulsion]);

  return (
    <div className="App">
      <motion.div
        className="gradient-blob"
        animate={{
          top: blobPosition.top,
          left: `${blobPosition.left}%`,
          opacity: 1
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 25,
          mass: 0.8
        }}
        initial={{ opacity: 0, top: window.innerHeight * 0.25, left: '80%' }}
      />
      
      <Header />
      
      <main>
        <Hero />
        <About />
       {/* <Experience /> */}
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;