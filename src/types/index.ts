// Core types for the portfolio application

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements?: string[];
}

export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  category: PhotoCategory;
  title?: string;
  description?: string;
}

export type PhotoCategory = 'all' | 'portrait' | 'landscape' | 'street' | 'nature';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon?: string;
  level?: number;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  location: string;
  avatar?: string;
  socialLinks: SocialLink[];
  skills: Skill[];
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

// Animation variants for Framer Motion
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
    };
  };
}

// Component props interfaces
export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}
