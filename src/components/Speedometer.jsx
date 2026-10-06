import React from 'react';
import { Gauge, Zap } from 'lucide-react';

export default function Speedometer({ scrollSpeed, isAccelerating, onBoostStart, onBoostEnd, activeChapter }) {
  const currentSpeed = Math.round(Math.min(160, 20 + scrollSpeed * 22 + (isAccelerating ? 80 : 0)));

  return (
    <div className="bottom-dock">
      <div className="speed-pill">
        <Gauge size={18} color="#d9453d" />
        <span>
          <strong style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
            {currentSpeed}
          </strong>{' '}
          KM/H
        </span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span style={{ fontSize: '0.72rem', color: '#666' }}>
          {isAccelerating ? (
            <span style={{ color: '#d9453d', fontWeight: 800 }}>⚡ BOOST ACTIVE</span>
          ) : (
            'SCROLL TO DRIVE • HOLD SPACE TO ACCELERATE'
          )}
        </span>
      </div>

      <button
        type="button"
        className={`accelerator-btn ${isAccelerating ? 'boosting' : ''}`}
        onMouseDown={onBoostStart}
        onMouseUp={onBoostEnd}
        onTouchStart={onBoostStart}
        onTouchEnd={onBoostEnd}
        title="Hold to boost car speed"
      >
        <Zap size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
        {isAccelerating ? 'BOOSTING!' : 'NITRO BOOST'}
      </button>
    </div>
  );
}
