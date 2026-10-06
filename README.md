# 🏎️ P. SANDEEP — 3D Scroll-Driven Developer Portfolio

An interactive, award-style 3D scroll-driven developer portfolio website built for **P. SANDEEP** (B.Tech Computer Science and Engineering, VITS, batch 2024–2028). 

Featuring a stylized cartoon car on an endless road that drifts, pivots, and accelerates as visitors scroll through the narrative chapters.

---

## ✨ Features

- **🎮 3D Cinematic Storytelling:** A continuous 3D canvas pinned in the background while chapter cards alternate seamlessly as you scroll.
- **🏎️ Dynamic Car & Camera Choreography:**
  - **Hero (01):** Card on the left $\rightarrow$ Car framed on the right.
  - **About (02):** Card on the right $\rightarrow$ Car drifts over to the left.
  - **Skills (03):** Card on the left $\rightarrow$ Car pulls over to the right.
  - **Deployed Builds (04):** Card on the right $\rightarrow$ Full car and road framed clearly on the left.
  - **Contact (05):** Car turns 180° to brake into the camera with illuminated headlights.
- **💨 Volumetric Drift Smoke:** Continuous 3D cartoon dust and smoke clouds billow from the rear tires in world space, fanning out naturally across the asphalt during drifts.
- **⚡ Nitro Boost Acceleration:** Press and hold **SPACEBAR** (or tap the bottom NITRO BOOST button) to accelerate the car, speeding up the road, wheels, suspension vibration, and smoke plumes.
- **🔊 Procedural Engine Synthesizer:** Real-time engine hum built with the Web Audio API (no external `.mp3` dependencies) that pitches up with scroll velocity and nitro boost, complete with a mute toggle.
- **📜 Lenis Smooth Scrolling:** Butter-smooth scroll interpolation with synchronization between the 3D camera and semantic HTML layout.
- **📱 Fully Responsive & Accessible:** Semantic HTML elements, keyboard navigation (`ArrowDown` / `ArrowUp` / `PageDown` / `PageUp`), mobile touch accelerator, and high-contrast typography.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **3D Graphics:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Audio:** Web Audio API (Synthesizer)
- **Styling:** Vanilla CSS with custom cel-shading and film-grain overlay

---

## 📁 Project Structure

```
├── public/
│   └── che.glb                 # 3D car model asset
├── src/
│   ├── components/
│   │   ├── AudioPlayer.jsx     # Procedural Web Audio API engine rumble synthesizer
│   │   ├── CarModel.jsx        # 3D car loader, suspension bob, lighting & transparent shadow
│   │   ├── CustomCursor.jsx    # Custom animated cursor with button magnetic state
│   │   ├── EnvironmentRoad.jsx # Scrolling road strip, curbs, dashed lines & speed streaks
│   │   ├── Icons.jsx           # SVG icons for GitHub and LinkedIn
│   │   ├── Loader.jsx          # Illustrated garage preloader with progress bar
│   │   ├── Navbar.jsx          # Top bar, sound toggle & full-screen navigation drawer
│   │   ├── Overlay.jsx         # 5-chapter semantic HTML overlay (Hero, About, Skills, Projects, Contact)
│   │   ├── Scene.jsx           # Canvas, lights, and smooth camera lerp rig
│   │   ├── SideNav.jsx         # Vertical 01–05 chapter timeline indicators
│   │   ├── Speedometer.jsx     # Speed gauge, Nitro Boost trigger & KM/H readout
│   │   └── WheelSmoke.jsx      # Volumetric 3D drift smoke & dust kickup system
│   ├── data/
│   │   └── chapters.js         # Single source of truth for camera angles, colors, copy, projects & skills
│   ├── App.jsx                 # Lenis orchestrator, nitro listener & chapter manager
│   ├── index.css               # Typography, ink styling, responsive grid & film grain
│   └── main.jsx                # React root entry
├── index.html                  # SEO, Bebas Neue, Space Grotesk & JetBrains Mono fonts
├── vite.config.js              # Vite bundler configuration
└── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open **`http://localhost:3000/`** in your browser.

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## ✏️ Customization Guide

All personal info, skills, projects, and camera coordinates are configured in a single file:
👉 **[`src/data/chapters.js`](src/data/chapters.js)**

### Updating Bio & Personal Info
In `chapters.js`, edit the `about` chapter:
```javascript
description: 'Your bio goes here...',
highlights: [
  { label: 'Degree', value: 'B.Tech in CSE' },
  { label: 'Campus', value: 'VITS Hyderabad' },
  ...
]
```

### Adding / Editing Skills
Under the `skills` chapter, update the categories:
```javascript
categories: [
  {
    name: 'Frontend & 3D',
    skills: ['React.js', 'Three.js', 'JavaScript', ...],
  },
  {
    name: 'Backend & Systems',
    skills: ['Node.js', 'Express.js', 'MongoDB', ...],
  },
]
```

### Adding New Projects
Under the `projects` chapter, update `projectsList`:
```javascript
{
  id: 'my-project',
  title: 'PROJECT TITLE',
  category: 'Full-Stack Platform',
  badge: 'FEATURED',
  stack: ['React', 'Node.js', 'MongoDB'],
  description: '1-line summary of what the project does.',
  liveUrl: 'https://your-demo-url.com',
  githubUrl: 'https://github.com/username/repo',
}
```

### Updating Social Links
Under the `contact` chapter, update the `socials` array with your actual profile URLs.

---

## 🚢 Deployment

### Deploy to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build` | Output Directory: `dist`.
6. Click **Deploy**.

### Deploy to Netlify
1. Connect your GitHub repository to [Netlify](https://www.netlify.com/).
2. Build Command: `npm run build`.
3. Publish Directory: `dist`.
4. Click **Deploy site**.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
