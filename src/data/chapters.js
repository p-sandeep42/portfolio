export const CHAPTERS = [
  {
    id: 'hero',
    number: '01',
    name: 'HERO',
    title: 'P. SANDEEP',
    subtitle: 'STUDENT • WEB DEVELOPER • BUILDER OF THINGS THAT MOVE',
    badge: 'B.TECH CSE (2024–2028) @ VITS',
    description: 'Engineering interactive 3D web experiences, dynamic user interfaces, and robust backend architectures.',
    theme: {
      bgTop: '#D6D8E4',
      bgBottom: '#B4B8C8',
      carPaint: '#7FC8B8', // Original Teal
      rimColor: '#D9453D',
      ambientColor: '#F5F5FA',
      lightColor: '#FFF8E7',
      accentColor: '#FFD98A',
      fogColor: '#C4C7D5',
    },
    camera: {
      position: [4.8, 2.2, 5.2],
      target: [-1.8, 0.45, 0],
      fov: 42,
    },
    car: {
      position: [0.2, 0, -0.8], // Card is on LEFT -> Car framed on RIGHT
      rotation: [0, -0.45, 0],
      suspensionBounce: 1.0,
      headlights: false,
      kitVariant: 'stock',
    },
    align: 'left',
  },
  {
    id: 'about',
    number: '02',
    name: 'ABOUT',
    title: 'ENGINEERING & DRIVE',
    subtitle: 'THE STORY SO FAR',
    badge: 'ABOUT ME',
    description:
      'Currently pursuing B.Tech in Computer Science and Engineering at Vignan Institute of Technology and Science (VITS), batch of 2024–2028. Moving from crafting pixel-perfect interactive frontends to designing high-concurrency Node.js microservices and production databases.',
    highlights: [
      { label: 'Degree', value: 'B.Tech in CSE' },
      { label: 'Campus', value: 'VITS Hyderabad' },
      { label: 'Timeline', value: '2024 – 2028' },
      { label: 'Focus', value: 'Fullstack & 3D Web' },
    ],
    theme: {
      bgTop: '#E8D5CE',
      bgBottom: '#C5AFA5',
      carPaint: '#E0533C', // Terracotta / Racing Coral
      rimColor: '#2A2530',
      ambientColor: '#FFEFEB',
      lightColor: '#FFF0D9',
      accentColor: '#FF6B6B',
      fogColor: '#CBB4AA',
    },
    camera: {
      position: [4.5, 2.0, 3.8],
      target: [1.2, 0.45, -0.3],
      fov: 40,
    },
    car: {
      position: [-0.4, 0, 0.4], // Card is on RIGHT -> Car framed on LEFT
      rotation: [0, -0.95, -0.05],
      suspensionBounce: 1.2,
      headlights: false,
      kitVariant: 'street',
    },
    align: 'right',
  },
  {
    id: 'skills',
    number: '03',
    name: 'SKILLS',
    title: 'THE ENGINE BAY',
    subtitle: 'FULL-STACK TECH STACK',
    badge: 'TECHNICAL SPECS',
    description:
      'A tuned pipeline from frontend physics and canvas shaders down to REST APIs, authentication protocols, and scalable datastores.',
    categories: [
      {
        name: 'Frontend & 3D',
        skills: ['React.js', 'JavaScript (ES6+)', 'Three.js', 'React Three Fiber', 'GSAP', 'HTML5 / CSS3', 'TailwindCSS'],
      },
      {
        name: 'Backend & Systems',
        skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'JWT Auth'],
      },
      {
        name: 'Core & Fundamentals',
        skills: ['Data Structures & Algorithms (DSA)', 'Object-Oriented Design', 'Git & GitHub', 'Vite / Webpack'],
      },
    ],
    theme: {
      bgTop: '#CCE0D8',
      bgBottom: '#9FBFA9',
      carPaint: '#88D49E', // Tuner Mint Green
      rimColor: '#D9453D',
      ambientColor: '#E6F4EE',
      lightColor: '#F0FFE8',
      accentColor: '#4ADE80',
      fogColor: '#A8C7B3',
    },
    camera: {
      position: [3.5, 1.8, 4.2],
      target: [-1.4, 0.45, 0.3],
      fov: 40,
    },
    car: {
      position: [0.2, 0, -0.6], // Card is on LEFT -> Car framed on RIGHT
      rotation: [0, -0.2, 0.04],
      suspensionBounce: 0.8,
      headlights: false,
      kitVariant: 'tuner',
    },
    align: 'left',
  },
  {
    id: 'projects',
    number: '04',
    name: 'PROJECTS',
    title: 'DEPLOYED BUILDS',
    subtitle: 'SELECTED CREATIONS',
    badge: 'FEATURED WORKS',
    description:
      'Real-world web apps designed for campus utility, developers, and visual interaction. Tested, responsive, and performance-tuned.',
    projectsList: [
      {
        id: 'notify',
        title: 'NOTIFY — CAMPUS DIGITAL DASHBOARD',
        category: 'Full-Stack Campus Platform',
        badge: 'FEATURED / VITS UTILITY',
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
        description:
          'Unified digital notice board and announcement system for VITS campus. Real-time broadcast categories, department filtering, verified admin authentication, and automated notification streams.',
        liveUrl: 'https://github.com',
        githubUrl: 'https://github.com',
        metrics: 'Used by 500+ campus students daily',
      },
      {
        id: 'project-2',
        title: 'NEXUS DEV — REAL-TIME COLLAB SUITE',
        category: 'Full-Stack Developer Space',
        badge: 'ACTIVE DEVELOPMENT',
        stack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
        description:
          'Live developer room with synchronized code sketching, markdown documentation share, and instant peer feedback rooms.',
        liveUrl: 'https://github.com',
        githubUrl: 'https://github.com',
        metrics: 'Sub-50ms sync latency',
      },
      {
        id: 'project-3',
        title: 'ALGOPULSE — 3D ALGORITHM PLAYGROUND',
        category: 'Creative Interactive Tool',
        badge: 'CREATIVE DEV',
        stack: ['Three.js', 'React', 'GSAP', 'Web Audio API'],
        description:
          'Visual spatial sandbox illustrating graph traversals, pathfinding, and sorting mechanisms with audio-reactive pulses.',
        liveUrl: 'https://github.com',
        githubUrl: 'https://github.com',
        metrics: '60 FPS on mobile browsers',
      },
    ],
    theme: {
      bgTop: '#D0D8E8',
      bgBottom: '#A8B7D2',
      carPaint: '#F2A900', // Racing Amber Yellow
      rimColor: '#2A2530',
      ambientColor: '#EEF4FF',
      lightColor: '#FFE7B3',
      accentColor: '#FFB800',
      fogColor: '#B0C0DA',
    },
    camera: {
      position: [0.5, 3.0, 7.5],
      target: [1.6, 0.45, -0.4],
      fov: 46,
    },
    car: {
      position: [-0.8, 0, 0.8], // Card is on RIGHT -> Car framed on LEFT
      rotation: [0, -0.4, 0],
      suspensionBounce: 1.2,
      headlights: false,
      kitVariant: 'racing',
    },
    align: 'right',
  },
  {
    id: 'contact',
    number: '05',
    name: 'CONTACT',
    title: "LET'S BUILD SOMETHING.",
    subtitle: 'OPEN FOR INTERNSHIPS & OPPORTUNITIES',
    badge: 'TERMINAL STATION',
    description:
      "Looking for a motivated developer who can blend high-end visual design with dependable backend code? Let's connect.",
    socials: [
      { name: 'Email', label: 'sandeep@example.com', href: 'mailto:sandeep@example.com' },
      { name: 'GitHub', label: 'github.com/p-sandeep', href: 'https://github.com' },
      { name: 'LinkedIn', label: 'linkedin.com/in/p-sandeep', href: 'https://linkedin.com' },
      { name: 'LeetCode', label: 'leetcode.com/u/p-sandeep', href: 'https://leetcode.com' },
    ],
    theme: {
      bgTop: '#1E1B26',
      bgBottom: '#100E15',
      carPaint: '#7FC8B8', // High-contrast neon teal at night
      rimColor: '#D9453D',
      ambientColor: '#2D2838',
      lightColor: '#FFE38F',
      accentColor: '#00F5D4',
      fogColor: '#17141E',
    },
    camera: {
      position: [0.1, 1.4, 5.2], // Front-facing hero camera
      target: [0, 0.45, 0],
      fov: 42,
    },
    car: {
      position: [0, 0, 0], // Finale: Front-and-center
      rotation: [0, -3.14, 0], // Directly facing camera with drift stance
      suspensionBounce: 0.6,
      headlights: true, // Blazing yellow/white beams
      kitVariant: 'racing',
    },
    align: 'center',
  },
];
