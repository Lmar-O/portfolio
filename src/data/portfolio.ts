import type { Project, PersonalInfo, NavigationItem, Experience } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Lmar Oria",
  title: "Software Engineer",
  description: "Passionate software engineer focused on creating innovative digital solutions and building scalable applications with modern technologies.",
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
      url: "https://linkedin.com/in/Lmar-O",
      icon: "linkedin"
    },

  ],
  skills: [
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" },
    { name: "Python", icon: "python" },
    { name: "HTML/CSS", icon: "html" },
    { name: "Git", icon: "git" },
    { name: "Node.js", icon: "nodejs" },
    { name: "MongoDB", icon: "database" },
    { name: "AWS", icon: "globe" },
    { name: "Docker", icon: "code" }
  ]
};

export const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" }
];

export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "A modern, responsive personal portfolio website built with React, TypeScript, and Framer Motion. Features smooth animations, responsive design, and optimized performance.",
    technologies: ["React", "TypeScript", "Framer Motion", "CSS", "Vite"],
    githubUrl: "https://github.com/lmaroria/portfolio",
    liveUrl: "https://lmaroria.com",
    featured: true
  },
  {
    id: "task-management",
    title: "Task Management App",
    description: "A full-stack task management application with user authentication, real-time updates, and collaborative features. Built with modern technologies and best practices.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    githubUrl: "https://github.com/lmaroria/task-manager",
    featured: true
  },
  {
    id: "e-commerce-api",
    title: "E-Commerce REST API",
    description: "A scalable RESTful API for an e-commerce platform with user management, product catalog, shopping cart, and payment integration. Includes comprehensive testing and documentation.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Stripe API"],
    githubUrl: "https://github.com/lmaroria/ecommerce-api",
    featured: false
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "An interactive weather dashboard with location-based forecasts, data visualization, and responsive design. Integrates with multiple weather APIs for accurate data.",
    technologies: ["JavaScript", "Chart.js", "Weather API", "CSS Grid", "Local Storage"],
    githubUrl: "https://github.com/lmaroria/weather-dashboard",
    liveUrl: "https://lmaroria-weather.netlify.app",
    featured: false
  }
];

// Experience data for software engineering career
export const experience: Experience[] = [
  {
    id: "current-learning",
    company: "Self-Directed Learning",
    position: "Aspiring Software Engineer",
    duration: "2024 - Present",
    description: "Focused on building foundational skills in modern web development, algorithms, and software engineering best practices.",
    technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Python"],
    achievements: [
      "Built multiple full-stack applications",
      "Completed comprehensive programming courses",
      "Contributing to open source projects"
    ]
  }
];

export const aboutText = {
  introduction: "I'm a passionate software engineer dedicated to building innovative solutions and creating exceptional user experiences through clean, efficient code.",
  journey: "I'm committed to continuous learning and staying current with the latest technologies and best practices. I enjoy tackling complex problems and collaborating with teams to deliver high-quality software solutions.",
  philosophy: "I believe in writing maintainable code, following industry best practices, and creating applications that not only function well but also provide intuitive and delightful user experiences."
};

export const stats = [
  {
    number: "∞",
    label: "Lines of Code"
  },
  {
    number: "10+",
    label: "Technologies"
  },
  {
    number: "100%",
    label: "Dedication"
  }
];
