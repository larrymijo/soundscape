// Maps BPM to a hue and animation speed
export function bpmToTheme(bpm) {
  if (!bpm) return { hue: 260, speed: 2, label: 'chill' };

  if (bpm < 90)  return { hue: 200, speed: 4,   label: 'chill',    pulse: 'slow' };
  if (bpm < 120) return { hue: 160, speed: 2.5,  label: 'groove',   pulse: 'medium' };
  if (bpm < 140) return { hue: 280, speed: 1.8,  label: 'vibes',    pulse: 'medium' };
  if (bpm < 160) return { hue: 30,  speed: 1.2,  label: 'energy',   pulse: 'fast' };
  return           { hue: 0,   speed: 0.8,  label: 'intense',  pulse: 'rapid' };
}

export function hslString(hue, s = 70, l = 55) {
  return `hsl(${hue}, ${s}%, ${l}%)`;
}