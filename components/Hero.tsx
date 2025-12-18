
import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '../data/wedding';

interface HeroProps {
  pronoun: string;
}

const Hero: React.FC<HeroProps> = ({ pronoun }) => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        style={{ willChange: 'transform' }} // Optimization: Hints browser to use GPU
      >
        {/* Updated to the specific wedding image provided by the user */}
        <img 
          src="https://res.cloudinary.com/dooptsu3i/image/upload/v1765725488/h%C3%ACnh_%E1%BA%A3nh_2025-12-14_221726434_he23bo.png" 
          alt="Louis & Linh Wedding" 
          className="w-full h-full object-cover"
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
          decoding="sync"
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-black/20" /> {/* General dim */}
      </motion.div>

      {/* Bokeh Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-30 blur-md"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Content Container - Justify End to push text to bottom since icon is removed */}
      <div className="relative z-10 h-full flex flex-col justify-end items-center pb-24 px-4">
        
        {/* BOTTOM: Text Info */}
        <div className="text-center flex flex-col items-center">
            <motion.p 
              className="text-white/90 tracking-[0.3em] text-sm uppercase mb-3 font-body font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              SAVE THE DATE
            </motion.p>

            {/* Names */}
            <motion.h1 
              className="font-script text-6xl md:text-8xl text-white mb-6 drop-shadow-lg leading-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {WEDDING_DATA.groom.name.split(' ')[0]}
              <span className="mx-3 text-4xl align-middle">&</span>
              {WEDDING_DATA.bride.name.split(' ')[0]}
            </motion.h1>
            
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <p className="text-brand-gold font-bold tracking-widest text-xl font-body">
                {WEDDING_DATA.heroDate}
              </p>
            </motion.div>
            
            <motion.p
              className="text-white/70 text-sm mt-4 font-light italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              Ngày {pronoun} về chung một nhà
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div 
                className="mt-8 flex flex-col items-center text-white/60 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                onClick={() => {
                document.getElementById('family')?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
                </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
