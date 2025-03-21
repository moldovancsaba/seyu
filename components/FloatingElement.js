import { motion } from 'framer-motion';

export default function FloatingElement({ 
  className, 
  delay = 0,
  duration = 20,
  y = 20,
  rotate = 0
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [0, y, 0],
        rotate: [0, rotate, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        times: [0, 0.5, 1]
      }}
    />
  );
}

// Example shapes that match bfoundnow.com
export function Circle({ className, ...props }) {
  return (
    <FloatingElement
      className={`w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 ${className}`}
      {...props}
    />
  );
}

export function Ring({ className, ...props }) {
  return (
    <FloatingElement
      className={`w-8 h-8 rounded-full border-2 border-blue-500/30 ${className}`}
      {...props}
    />
  );
}

export function Square({ className, ...props }) {
  return (
    <FloatingElement
      className={`w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 ${className}`}
      {...props}
    />
  );
}

export function Dot({ className, ...props }) {
  return (
    <FloatingElement
      className={`w-2 h-2 rounded-full bg-blue-500 ${className}`}
      {...props}
    />
  );
}

