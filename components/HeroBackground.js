import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark via-secondary to-secondary-light opacity-90" />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* Animated gradient elements */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,71,71,0.2) 0%, rgba(255,71,71,0) 70%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,71,71,0.15) 0%, rgba(255,71,71,0) 70%)',
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          filter: 'contrast(320%) brightness(100%)',
        }}
      />
    </div>
  );
}

import { Circle, Ring, Square, Dot } from './FloatingElement';

export default function HeroBackground() {
  return (
    <>
      {/* Main gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-purple-600/20 to-transparent" />
      
      {/* Mesh grid */}
      <div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30"
        style={{
          maskImage: 'linear-gradient(to bottom, white, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)'
        }}
      />
      
      {/* Floating elements */}
      <Circle className="top-20 left-[10%]" duration={15} y={30} />
      <Ring className="top-40 right-[15%]" duration={18} y={25} rotate={360} />
      <Square className="bottom-32 left-[20%]" duration={20} y={40} rotate={-360} />
      <Dot className="top-1/3 right-[25%]" duration={12} y={15} />
      <Circle className="bottom-20 right-[30%]" duration={16} y={35} />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)'
        }}
      />
    </>
  );
}

