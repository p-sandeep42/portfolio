import React from 'react';
import { useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress, active } = useProgress();

  if (!active && progress >= 100) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#c9cbd6',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        color: '#2a2530',
        padding: '2rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3.6rem',
          letterSpacing: '0.04em',
          marginBottom: '0.4rem',
        }}
      >
        P. SANDEEP
      </div>

      <div
        style={{
          fontSize: '0.82rem',
          letterSpacing: '0.14em',
          fontWeight: 700,
          color: '#d9453d',
          marginBottom: '2rem',
        }}
      >
        TUNING 3D ENGINE • {Math.round(progress)}%
      </div>

      <div
        style={{
          width: '240px',
          height: '10px',
          border: '2px solid #2a2530',
          borderRadius: '999px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          boxShadow: '3px 3px 0px #2a2530',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.round(progress)}%`,
            backgroundColor: '#d9453d',
            transition: 'width 0.2s ease',
          }}
        />
      </div>
    </div>
  );
}
