import { useEffect, useRef } from 'react';
import { Anchor, Compass, Map, Ship, Waves } from 'lucide-react';

export default function MainMenu() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(166, 225, 250, ${particle.opacity})`;
        ctx.fill();

        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(166, 225, 250, ${0.1 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const menuItems = [
    { icon: Ship, label: 'Voyage', angle: 0 },
    { icon: Compass, label: 'Navigate', angle: 72 },
    { icon: Map, label: 'Explore', angle: 144 },
    { icon: Waves, label: 'Tides', angle: 216 },
    { icon: Anchor, label: 'Harbor', angle: 288 },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#00072D] via-[#001C55] to-[#0A2472] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <Anchor size={40} className="text-[#A6E1FA]" strokeWidth={1.5} />
        <h1 className="text-4xl font-bold text-[#A6E1FA] tracking-wide">OCEANIC</h1>
      </div>

      <div className="relative z-10 h-full flex items-center justify-start pl-32">
        <div
          className="relative w-[500px] h-[500px]"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              transform: 'rotateY(-15deg) rotateX(-5deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="absolute inset-0 rounded-full border-2 border-[#0E6BA8] opacity-30 animate-pulse-slow"
              style={{ transform: 'translateZ(-20px)' }}
            />
            <div
              className="absolute inset-8 rounded-full border border-[#0E6BA8] opacity-20"
              style={{ transform: 'translateZ(-10px)' }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0E6BA8] to-[#0A2472] flex items-center justify-center border-4 border-[#A6E1FA] hover:scale-110 transition-transform duration-300 cursor-pointer"
                style={{
                  transform: 'translateZ(40px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(166, 225, 250, 0.3)',
                }}
              >
                <span className="text-[#A6E1FA] text-xl font-semibold">MENU</span>
              </div>
            </div>

            {menuItems.map((item, index) => {
              const radius = 180;
              const angleRad = (item.angle * Math.PI) / 180;
              const x = Math.cos(angleRad - Math.PI / 2) * radius;
              const y = Math.sin(angleRad - Math.PI / 2) * radius;

              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) translateZ(${20 + index * 3}px)`,
                  }}
                >
                  <div
                    className="group w-24 h-24 rounded-full bg-gradient-to-br from-[#0A2472] to-[#001C55]
                    flex flex-col items-center justify-center gap-1
                    border-2 border-[#0E6BA8] hover:border-[#A6E1FA]
                    hover:scale-110 transition-all duration-300 cursor-pointer
                    animate-float"
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(14, 107, 168, 0.4)',
                    }}
                  >
                    <item.icon
                      size={28}
                      className="text-[#A6E1FA] group-hover:text-white transition-colors"
                      strokeWidth={1.5}
                    />
                    <span className="text-[#A6E1FA] text-xs font-medium group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#0E6BA8] text-sm">
        Select a destination to begin your journey
      </div>
    </div>
  );
}
