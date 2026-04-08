import { useEffect, useRef } from 'react';
import { hslString } from '../utils/bpmColor';

export default function Visualizer({ bpm, isPlaying, hue }) {
  const barsRef = useRef([]);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(performance.now());

  const BAR_COUNT = 32;
  const beatInterval = bpm ? (60 / bpm) * 1000 : 1000;

  useEffect(() => {
    const animate = (timestamp) => {
      const elapsed = timestamp - startTimeRef.current;
      const beatProgress = (elapsed % beatInterval) / beatInterval;
      const beatPulse = Math.pow(Math.sin(beatProgress * Math.PI), 2);

      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        // Each bar has its own frequency offset
        const freq = (i / BAR_COUNT) * Math.PI * 4;
        const wave = Math.abs(Math.sin(elapsed * 0.002 * (1 + i * 0.05) + freq));
        const pulse = isPlaying ? (wave * 0.6 + beatPulse * 0.4) : wave * 0.15;
        const height = 8 + pulse * 92;
        const opacity = 0.3 + pulse * 0.7;
        bar.style.height = `${height}px`;
        bar.style.opacity = opacity;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [bpm, isPlaying, beatInterval]);

  return (
    <div className="visualizer">
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div
          key={i}
          ref={el => barsRef.current[i] = el}
          className="vis-bar"
          style={{
            background: hslString(hue + (i * 3), 80, 60),
            width: `${100 / BAR_COUNT - 0.5}%`,
          }}
        />
      ))}
    </div>
  );
}