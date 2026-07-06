export default function ParticleBackground({ glow = true }: { glow?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-sky" />
      <div className="hero-particles" />
      <div className="hero-particles layer-2" />
      <div className="hero-particles layer-3" />
      {glow && <div className="hero-glow" />}
    </div>
  );
}
