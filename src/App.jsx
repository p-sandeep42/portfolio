import React, { useEffect, useState, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import Speedometer from './components/Speedometer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import { CHAPTERS } from './data/chapters';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const lenisRef = useRef(null);
  const lastScrollY = useRef(0);
  const speedDecayTimer = useRef(null);

  // Smooth scroll to chapter
  const handleSelectChapter = useCallback((index) => {
    const chapterId = CHAPTERS[index]?.id;
    if (!chapterId) return;

    setActiveChapterIndex(index);

    const el = document.getElementById(chapterId);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const updateScrollMetrics = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(progress);

      // Determine active chapter by checking section positions
      let currentIdx = 0;
      CHAPTERS.forEach((ch, idx) => {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section is around the middle of the viewport
          if (rect.top <= window.innerHeight * 0.55) {
            currentIdx = idx;
          }
        }
      });
      setActiveChapterIndex(currentIdx);

      // Velocity calculation
      const delta = Math.abs(scrollY - lastScrollY.current);
      lastScrollY.current = scrollY;
      const currentSpeed = Math.min(4.0, delta * 0.05);
      setScrollSpeed(currentSpeed);

      if (speedDecayTimer.current) clearTimeout(speedDecayTimer.current);
      speedDecayTimer.current = setTimeout(() => {
        setScrollSpeed(0);
      }, 100);
    };

    lenis.on('scroll', updateScrollMetrics);
    window.addEventListener('scroll', updateScrollMetrics, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateScrollMetrics);
      lenis.destroy();
    };
  }, []);

  // Keyboard navigation & Spacebar boost
  useEffect(() => {
    const onKeyDown = (e) => {
      // Spacebar acceleration
      if (e.code === 'Space' && !e.repeat && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsAccelerating(true);
      }

      // Arrow navigation between chapters
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        setActiveChapterIndex((prev) => {
          const next = Math.min(CHAPTERS.length - 1, prev + 1);
          handleSelectChapter(next);
          return next;
        });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        setActiveChapterIndex((prev) => {
          const prevIdx = Math.max(0, prev - 1);
          handleSelectChapter(prevIdx);
          return prevIdx;
        });
      }
    };

    const onKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsAccelerating(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [handleSelectChapter]);

  return (
    <div className="app-container">
      {/* 1. Film Grain Aesthetic Texture */}
      <div className="grain-overlay" />

      {/* 2. Pinned 3D Canvas Scene */}
      <Scene
        scrollProgress={scrollProgress}
        scrollSpeed={scrollSpeed}
        isAccelerating={isAccelerating}
        activeChapterIndex={activeChapterIndex}
      />

      {/* 3. Pinned Navigation and Controls */}
      <Navbar
        activeChapter={activeChapterIndex}
        onSelectChapter={handleSelectChapter}
        scrollSpeed={scrollSpeed}
        isAccelerating={isAccelerating}
      />

      <SideNav
        activeChapter={activeChapterIndex}
        onSelectChapter={handleSelectChapter}
      />

      <Speedometer
        scrollSpeed={scrollSpeed}
        isAccelerating={isAccelerating}
        onBoostStart={() => setIsAccelerating(true)}
        onBoostEnd={() => setIsAccelerating(false)}
        activeChapter={activeChapterIndex}
      />

      <CustomCursor />

      {/* 4. Full-page Scroll Sections */}
      <Overlay onSelectChapter={handleSelectChapter} />

      {/* 5. Preloader */}
      <Loader />
    </div>
  );
}
