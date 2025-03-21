import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <HeroBackground />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 pt-32 pb-24 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          variants={itemVariants}
        >
          Find What Matters Most
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          The fastest way to recover your lost items. Our smart technology and global network help you find what's important to you.
        </motion.p>

        <motion.div 
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105">
            Get Started Now
          </button>
          <button className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-lg transform hover:scale-105">
            Learn More
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="mt-24"
          variants={itemVariants}
        >
          <p className="text-gray-400 mb-6">Trusted by individuals and businesses worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {/* Add your partner/client logos here */}
            <div className="h-8 w-24 bg-white/10 rounded"></div>
            <div className="h-8 w-24 bg-white/10 rounded"></div>
            <div className="h-8 w-24 bg-white/10 rounded"></div>
            <div className="h-8 w-24 bg-white/10 rounded"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

