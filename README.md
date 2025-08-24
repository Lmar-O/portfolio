# LmarOria Portfolio - React + TypeScript

A modern, responsive personal portfolio website built with React, TypeScript, and Framer Motion. Showcases both software engineering projects and photography work with smooth animations and an elegant design.

## 🚀 Technologies Used

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Framer Motion** - Smooth animations and page transitions
- **Lucide React** - Beautiful, customizable icons
- **CSS Modules** - Scoped styling with modern CSS

## ✨ Features

- **Modern Design**: Clean, minimalist aesthetic inspired by contemporary portfolio sites
- **Dual Purpose**: Dedicated sections for both software engineering and photography
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Type Safe**: Full TypeScript support for better code quality
- **Photography Portfolio**: Interactive, filterable gallery with categories
- **Contact Form**: Functional form with validation and success states
- **SEO Optimized**: Semantic HTML and meta tags for search engines
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navigation header
│   │   └── Footer.tsx          # Site footer
│   ├── sections/
│   │   ├── Hero.tsx            # Landing section
│   │   ├── About.tsx           # About me section
│   │   ├── Projects.tsx        # Software projects showcase
│   │   ├── Photography.tsx     # Photography portfolio
│   │   └── Contact.tsx         # Contact form and info
│   └── ui/
│       ├── Button.tsx          # Reusable button component
│       ├── Card.tsx            # Card wrapper component
│       └── Section.tsx         # Section wrapper component
├── data/
│   └── portfolio.ts            # Portfolio content and configuration
├── types/
│   └── index.ts                # TypeScript type definitions
├── App.tsx                     # Main application component
└── main.tsx                    # Application entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see your portfolio

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎨 Customization Guide

### 1. Personal Information

Edit `src/data/portfolio.ts` to update:

- Personal details (name, title, description)
- Contact information
- Social media links
- Skills and technologies

```typescript
export const personalInfo: PersonalInfo = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description...",
  // ... rest of your info
};
```

### 2. Projects

Add your projects in the same file:

```typescript
export const projects: Project[] = [
  {
    id: "project-1",
    title: "Your Project",
    description: "Project description...",
    technologies: ["React", "TypeScript"],
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    featured: true,
  },
];
```

### 3. Photography Portfolio

Update the `photoGallery` array with your photos:

```typescript
export const photoGallery: PhotoItem[] = [
  {
    id: "photo-1",
    src: "/path/to/your/photo.jpg",
    alt: "Photo description",
    category: "landscape",
    title: "Photo Title",
  },
];
```

### 4. Styling and Colors

The design uses CSS custom properties. Update colors in `src/App.css`:

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --accent-color: #e74c3c;
  /* Add your custom colors */
}
```

### 5. Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to `src/App.tsx`
3. Update navigation in `src/data/portfolio.ts`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:

- Mobile: < 480px
- Tablet: < 768px
- Desktop: > 768px

## 🌐 Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Automatic deployments on every push

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect your GitHub repository

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
3. Run: `npm run deploy`

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔧 Advanced Customization

### Adding Dark Mode

1. Create a theme context in `src/contexts/ThemeContext.tsx`
2. Add theme toggle button to header
3. Update CSS with dark mode variables

### Adding a Blog

1. Create blog components in `src/components/blog/`
2. Set up React Router for navigation
3. Add markdown support with `react-markdown`

### Contact Form Integration

The contact form currently shows a success message. To make it functional:

#### Option 1: Netlify Forms

```html
<form name="contact" netlify></form>
```

#### Option 2: EmailJS

```bash
npm install @emailjs/browser
```

#### Option 3: Custom API

Update the `handleSubmit` function in `Contact.tsx` to call your API endpoint.

## 📊 Performance Optimization

- Images are lazy-loaded
- Components are optimized with React.memo where needed
- Vite provides automatic code splitting
- CSS is optimized and minified in production

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Structured data for search engines
- Sitemap generation ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips for Success

1. **Keep it updated**: Regularly add new projects and photos
2. **Optimize images**: Use WebP format and compress images
3. **Test across devices**: Ensure it works on all screen sizes
4. **Monitor performance**: Use Lighthouse to check performance scores
5. **Get feedback**: Ask others to review your portfolio

---

**Ready to make it yours?** Start by updating the content in `src/data/portfolio.ts` and replace the placeholder images with your actual work!

For support or questions, feel free to open an issue or reach out via the contact form on the live site.
