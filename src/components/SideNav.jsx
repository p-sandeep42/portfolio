import React from 'react';
import { CHAPTERS } from '../data/chapters';

export default function SideNav({ activeChapter, onSelectChapter }) {
  return (
    <aside className="side-nav" aria-label="Chapter timeline">
      {CHAPTERS.map((ch, idx) => {
        const isActive = activeChapter === idx;
        return (
          <button
            key={ch.id}
            className={`side-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelectChapter(idx)}
            title={`Jump to ${ch.name}`}
          >
            <span className="side-nav-dot" />
            <span>
              {ch.number} // {ch.name}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
