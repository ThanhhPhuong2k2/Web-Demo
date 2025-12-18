
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp } from './ui/Animations';
import { ICONS } from './Icons';

// Animation variants for sliding images
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Album: React.FC = () => {
  // Store index instead of just URL to enable navigation
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0); // For slide animation direction

  // Fetch images from Cloudinary list
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch("https://res.cloudinary.com/dooptsu3i/image/list/album2.json");
        const data = await response.json();
        
        if (data.resources && Array.isArray(data.resources)) {
          // Take first 45 images
          const limitedResources = data.resources.slice(0, 45);

          // Optimize images
          const fetchedImages = limitedResources.map((res: any) => 
            `https://res.cloudinary.com/dooptsu3i/image/upload/w_400,q_auto,f_auto/${res.public_id}`
          );
          setImages(fetchedImages);
        }
      } catch (error) {
        console.error("Error loading album images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, []);

  // Navigation Logic
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setSelectedIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1; // Loop to end
      if (nextIndex >= images.length) nextIndex = 0; // Loop to start
      return nextIndex;
    });
  }, [images.length]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === -1) return;
      
      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'Escape') {
        setSelectedIndex(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, paginate]);

  // Divide images into 3 columns
  const chunkArray = (arr: string[], chunks: number) => {
    const result: string[][] = Array.from({ length: chunks }, () => []);
    arr.forEach((item, index) => {
      result[index % chunks].push(item);
    });
    return result;
  };

  const [col1, col2, col3] = images.length > 0 
    ? chunkArray(images, 3) 
    : [[], [], []];

  // Helper to open lightbox from a specific image URL
  const openLightbox = (imgSrc: string) => {
    const index = images.indexOf(imgSrc);
    if (index !== -1) {
      setDirection(0);
      setSelectedIndex(index);
    }
  };

  const SmoothColumn = ({ images: colImages, direction, duration }: { images: string[], direction: 'up' | 'down', duration: number }) => {
    if (colImages.length === 0) return null;

    const ImageBlock = () => (
      <div className="flex flex-col gap-3 pb-3">
        {colImages.map((src, i) => (
           <img 
            key={i} 
            src={src} 
            loading="eager"
            decoding="async"
            alt="Wedding moment"
            className="w-full h-auto rounded-xl shadow-sm cursor-pointer object-cover border border-white/50 bg-gray-100 pointer-events-auto hover:opacity-90 transition-opacity"
            style={{ transform: 'translate3d(0,0,0)' }}
            onClick={() => openLightbox(src)} 
          />
        ))}
      </div>
    );
    
    return (
      <div className="relative w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="w-full"
          initial={{ y: direction === 'down' ? "-50%" : "0%" }}
          animate={{ y: direction === 'down' ? "0%" : "-50%" }}
          transition={{
            duration: duration, 
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
          style={{ willChange: "transform" }}
        >
          <ImageBlock />
          <ImageBlock />
        </motion.div>
      </div>
    );
  };

  return (
    <section id="album" className="overflow-hidden">
      <div className="container mx-auto px-2">
        <FadeUp className="text-center mb-8">
          <h2 className="font-script text-4xl text-brand-dark mb-4">Khoảnh khắc</h2>
          <p className="font-body text-brand-dark/60 text-sm italic">
            Lưu giữ những phút giây hạnh phúc nhất
          </p>
        </FadeUp>

        {/* Masonry Container */}
        <div className="h-[500px] md:h-[700px] overflow-hidden rounded-[32px] relative p-3 bg-white/30 backdrop-blur-sm border border-white/40 shadow-inner min-h-[300px]">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F9F9F7] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F9F9F7] to-transparent z-10 pointer-events-none" />

            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center z-0">
                 <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
                    <p className="text-brand-dark/50 text-xs font-bold uppercase tracking-widest">Đang tải ảnh...</p>
                 </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 h-full transform-gpu">
                <SmoothColumn images={col1} direction="up" duration={45} />
                <SmoothColumn images={col2} direction="down" duration={55} />
                <SmoothColumn images={col3} direction="up" duration={50} />
              </div>
            )}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence initial={false} custom={direction}>
        {selectedIndex !== -1 && images[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-dark/95 flex items-center justify-center backdrop-blur-xl"
            onClick={() => setSelectedIndex(-1)}
          >
            {/* Close Button */}
            <button className="absolute top-4 right-4 z-50 text-white/70 p-3 hover:text-white bg-white/10 rounded-full backdrop-blur-md transition-all hover:bg-white/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev Button - Visible on mobile now */}
            <button 
              className="absolute left-2 md:left-4 z-50 text-white/70 p-2 md:p-3 hover:text-white bg-black/20 md:bg-white/10 rounded-full backdrop-blur-md transition-all hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            >
              <ICONS.ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Next Button - Visible on mobile now */}
            <button 
              className="absolute right-2 md:right-4 z-50 text-white/70 p-2 md:p-3 hover:text-white bg-black/20 md:bg-white/10 rounded-full backdrop-blur-md transition-all hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
            >
              <ICONS.ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-bold tracking-widest bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">
                {selectedIndex + 1} / {images.length}
            </div>

            {/* Main Image with Gestures */}
            <div 
                className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Clicking blank area closes, clicking image does nothing (prevents accidental close)
            >
                <motion.img
                  key={selectedIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  // Request high quality for lightbox
                  src={images[selectedIndex].replace('w_400', 'w_1200').replace('q_auto', 'q_auto')} 
                  alt={`Album photo ${selectedIndex + 1}`}
                  className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain pointer-events-auto touch-pan-y"
                />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Album;
