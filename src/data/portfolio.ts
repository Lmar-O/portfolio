import type { Project, PhotoItem, PersonalInfo, NavigationItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: "LmarOria",
  title: "Software Engineer & Photographer",
  description: "Passionate about creating beautiful digital experiences and capturing life's moments through code and lens.",
  email: "hello@lmaroria.com",
  location: "Open to Remote Opportunities",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/lmaroria",
      icon: "github"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/lmaroria",
      icon: "linkedin"
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/lmaroria",
      icon: "instagram"
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/lmaroria",
      icon: "twitter"
    }
  ],
  skills: [
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" },
    { name: "Python", icon: "python" },
    { name: "HTML/CSS", icon: "html" },
    { name: "Git", icon: "git" },
    { name: "Photography", icon: "camera" },
    { name: "Node.js", icon: "nodejs" }
  ]
};

export const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "photography", label: "Photography", href: "#photography" },
  { id: "contact", label: "Contact", href: "#contact" }
];

export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "A modern, responsive personal portfolio website built with React, TypeScript, and Framer Motion. Features smooth animations, a photography gallery, and optimized performance.",
    technologies: ["React", "TypeScript", "Framer Motion", "CSS Modules", "Vite"],
    githubUrl: "https://github.com/lmaroria/portfolio",
    liveUrl: "https://lmaroria.com",
    featured: true
  },
  {
    id: "learning-project",
    title: "Learning Projects",
    description: "Exciting projects coming soon as I continue my software engineering journey. Currently working on various tutorials and building my skills in modern web development.",
    technologies: ["JavaScript", "React", "Python", "SQL"],
    featured: false
  }
];

// Placeholder photo data - replace with actual photos
export const photoGallery: PhotoItem[] = [
  {
    id: "landscape-1",
    src: "/api/placeholder/400/400",
    alt: "Beautiful landscape photography",
    category: "landscape",
    title: "Mountain Vista",
    description: "Captured during golden hour in the mountains"
  },
  {
    id: "portrait-1",
    src: "/api/placeholder/400/400",
    alt: "Portrait photography",
    category: "portrait",
    title: "Urban Portrait",
    description: "Street portrait with natural lighting"
  },
  {
    id: "street-1",
    src: "/api/placeholder/400/400",
    alt: "Street photography",
    category: "street",
    title: "City Life",
    description: "Candid moment captured on busy street"
  },
  {
    id: "nature-1",
    src: "/api/placeholder/400/400",
    alt: "Nature photography",
    category: "nature",
    title: "Forest Path",
    description: "Peaceful trail through ancient forest"
  },
  {
    id: "portrait-2",
    src: "/api/placeholder/400/400",
    alt: "Creative portrait",
    category: "portrait",
    title: "Creative Portrait",
    description: "Experimental lighting and composition"
  },
  {
    id: "street-2",
    src: "/api/placeholder/400/400",
    alt: "Urban scene",
    category: "street",
    title: "Urban Geometry",
    description: "Architectural patterns in the city"
  }
];

export const aboutText = {
  introduction: "I'm a passionate individual exploring the intersection of technology and creativity. Currently building my expertise in software engineering while pursuing my love for photography.",
  journey: "Though I'm at the beginning of my professional journey, I'm committed to continuous learning and creating meaningful digital experiences. When I'm not coding, you'll find me behind the camera, capturing the world through a different lens.",
  philosophy: "I believe in the power of combining technical skills with creative vision to build products that not only function well but also inspire and delight users."
};

export const stats = [
  {
    number: "∞",
    label: "Learning Mindset"
  },
  {
    number: "2",
    label: "Passions Combined"
  },
  {
    number: "1",
    label: "Vision"
  }
];
