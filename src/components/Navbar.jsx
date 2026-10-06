import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import AudioPlayer from './AudioPlayer';
import { CHAPTERS } from '../data/chapters';

export default function Navbar({ activeChapter, onSelectChapter, scrollSpeed, isAccelerating }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (index) => {
    onSelectChapter(index);
    setIsOpen(false);
  };

  return (
    <>
      <header className="top-navbar">
        <a
          href="#hero"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            onSelectChapter(0);
          }}
        >
          <span>P. SANDEEP</span>
          <span style={{ fontSize: '0.9rem', color: '#d9453d', fontWeight: 'bold' }}>• DEV</span>
        </a>

        <div className="navbar-actions">
          <AudioPlayer scrollSpeed={scrollSpeed} isAccelerating={isAccelerating} />

          <button
            className="icon-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
            title="Navigation Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Full-screen Hamburger Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(42, 37, 48, 0.95)',
            backdropFilter: 'blur(16px)',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ maxWidth: '640px', width: '100%', textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: '#ffd98a', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              // DESTINATIONS
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => handleNavClick(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1.2rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: activeChapter === idx ? '#ffd98a' : '#ffffff',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                    textTransform: 'uppercase',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(12px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: '#d9453d' }}>
                    {ch.number}
                  </span>
                  <span>{ch.name}</span>
                  <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>— {ch.title}</span>
                </button>
              ))}
            </nav>

            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                paddingTop: '2rem',
              }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ backgroundColor: '#2a2530', color: '#fff', borderColor: '#ffd98a' }}
              >
                <GithubIcon size={16} /> GitHub <ArrowUpRight size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ backgroundColor: '#2a2530', color: '#fff', borderColor: '#ffd98a' }}
              >
                <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={14} />
              </a>
              <a
                href="mailto:sandeep@example.com"
                className="btn-primary"
                style={{ backgroundColor: '#d9453d' }}
              >
                <Mail size={16} /> Contact Me
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
