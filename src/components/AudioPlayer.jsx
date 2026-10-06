import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ scrollSpeed = 0, isAccelerating = false }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    if (isMuted) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(45, ctx.currentTime);
      osc2.frequency.setValueAtTime(90, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      gainNodeRef.current = gain;
    } else {
      audioCtxRef.current.resume();
    }
  }, [isMuted]);

  useEffect(() => {
    if (!audioCtxRef.current || isMuted) return;

    const ctx = audioCtxRef.current;
    const baseFreq = 42;
    const speedMultiplier = isAccelerating ? 2.2 : 1.0;
    const targetFreq = baseFreq + Math.min(scrollSpeed * 35, 120) * speedMultiplier;

    if (osc1Ref.current && osc2Ref.current) {
      osc1Ref.current.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.1);
      osc2Ref.current.frequency.setTargetAtTime(targetFreq * 1.5, ctx.currentTime, 0.1);
    }
  }, [scrollSpeed, isAccelerating, isMuted]);

  return (
    <button
      className="icon-btn"
      onClick={() => setIsMuted(!isMuted)}
      title={isMuted ? 'Turn engine sound ON' : 'Mute sound'}
      aria-label="Toggle audio"
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
}
