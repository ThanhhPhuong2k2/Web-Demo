
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ICONS } from './Icons';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Force completion after full animation duration to ensure UX doesn't hang
    const timer = setTimeout(() => {
      onComplete();
    }, 5500); // Tăng nhẹ thời gian để tận hưởng intro
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#EBEBE6]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ delay: 4.5, duration: 1 }}
    >
      {/* 
         1. Background Fallback & Poster 
         - Added 'poster' image so it's never black while loading.
         - Changed video URL to the new Cloudinary source provided.
      */}
      <div className="absolute inset-0 bg-[#EBEBE6] z-0" /> {/* Solid color fallback */}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <video 
          className="w-full h-full object-cover"
          // UPDATED: Added 'w_720' to force HD resolution (saves bandwidth vs 1080p), f_auto for format.
          src="https://res.cloudinary.com/dooptsu3i/video/upload/w_720,f_auto,q_auto/v1765722583/7814663-hd_1080_1920_30fps_s2aejo.mp4"
          // Generated poster from Cloudinary video to avoid Pexels/Cloudinary mismatch flash
          poster="https://res.cloudinary.com/dooptsu3i/video/upload/w_720,f_auto,q_auto/v1765722583/7814663-hd_1080_1920_30fps_s2aejo.jpg"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
        />
      </motion.div>

      {/* Dark overlay to make the envelope pop against the video */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-0" />

      {/* Envelope Container */}
      <motion.div
        className="relative w-72 h-52 sm:w-80 sm:h-60 z-10"
        initial={{ scale: 0.5, opacity: 0, rotateZ: -5 }}
        animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
        transition={{ duration: 0.8, ease: "backOut", delay: 0.2 }}
      >
        {/* Envelope Base (Back) */}
        <div className="absolute inset-0 bg-[#F5F5F0] rounded-lg shadow-2xl border-2 border-brand-gold/30" />

        {/* Card Inside (Rising out) */}
        <motion.div
          className="absolute left-3 right-3 top-2 bottom-2 bg-white rounded-md shadow-sm flex flex-col items-center justify-center p-4 text-center z-10 border border-gray-100"
          initial={{ y: 0 }}
          animate={{ y: -80 }} // Moves up out of envelope
          transition={{ delay: 2.0, duration: 1.2, ease: "easeInOut" }}
        >
          {/* Card Content */}
          <ICONS.DoubleHappiness className="w-10 h-10 text-green-700 mb-2" />
          <p className="font-script text-3xl text-brand-dark mb-0 leading-tight">Louis Trần</p>
          <p className="font-script text-xl text-brand-dark/60 mb-0 leading-tight">&</p>
          <p className="font-script text-3xl text-brand-dark leading-tight">Linh Soo</p>
        </motion.div>

        {/* Envelope Flap (Front - Bottom) */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#EBEBE6] rounded-b-lg z-20 border-t border-brand-gold/10 shadow-sm"
          style={{ clipPath: 'polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)' }} 
        />

        {/* Envelope Flap (Front - Top/Opening) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 origin-top z-30"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 180, zIndex: 0 }} // Flips open and goes behind
          transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* The visible flap when closed */}
          <div 
            className="absolute inset-0 bg-[#F5F5F0] rounded-t-lg border-b-2 border-brand-gold/50 flex items-center justify-center shadow-md"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 90%)', backfaceVisibility: 'hidden' }}
          >
             <div className="mt-[-25px] bg-brand-gold/20 p-2.5 rounded-full backdrop-blur-sm border border-brand-gold/30">
                <ICONS.DoubleHappiness className="w-6 h-6 text-brand-dark" />
             </div>
          </div>
        </motion.div>
        
        {/* Glow effect inside envelope when opened */}
        <motion.div 
           className="absolute inset-0 bg-brand-gold/20 blur-xl rounded-full z-0"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5, duration: 0.5 }}
        />

      </motion.div>
    </motion.div>
  );
};

export default Onboarding;
