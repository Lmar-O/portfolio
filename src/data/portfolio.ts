import type { Project, PersonalInfo, NavigationItem, Experience } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Lmar Oria",
  title: "Software Engineer",
  description: "Passionate software engineer focused on creating innovative digital solutions and building scalable applications with modern technologies.",
  email: "hello@lmaroria.com",
  location: "Open to Relocation or Remote Opportunities",
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
    { name: "Java", icon: "java" },
    { name: "C", icon: "c" },
    { name: "C#", icon: "csharp" },
    { name: "HTML/CSS", icon: "html" },
    { name: "Git", icon: "git" },
    { name: "Node.js", icon: "nodejs" },
    { name: "AWS", icon: "globe" },
    { name: "Docker", icon: "code" },
    { name: "MySQL", icon: "database" },

  ]
};

export const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  //{ id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" }
];

export const projects: Project[] = [
  {
    id: "maal-finance",
    title: "Maal Finance",
    description: "A full-stack personal finance education app for Muslims built with React, TypeScript, and Python. Features a user-friendly interface, responsive design, and a focus on financial education. Currently developing user authentication features",
    technologies: ["React", "TypeScript", "Chart.js", "Python"],
    githubUrl: "https://github.com/Lmar-O/maal",
    liveUrl: "https://maalfinance.com",
    featured: true
  },
  {
    id: "flybook",
    title: "FlyBook",
    description: "A full-stack e-commerce platform that enables users to browse, filter, and purchase books with real-time cart updates.",
    technologies: ["JavaScript", "Node.js", "Express.js", "Bootstrap"],
    githubUrl: "https://github.com/Lmar-O/Flybook",
    featured: false
  },
  {
    id: "timely",
    title: "Timely",
    description: "An Android-based to-do list application focused on efficient task management and user-friendly functionality.",
    technologies: ["Java", "Android Studio"],
    featured: false
  },
  {
    id: "haunt-and-seek",
    title: "Haunt & Seek",
    description: "A first-person 3D Unity game set in a haunted estate where players collect treasures while avoiding a ghost that resets the level on collision.",
    technologies: ["C#", "Unity", "Blender", "Unity Editor"],
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
