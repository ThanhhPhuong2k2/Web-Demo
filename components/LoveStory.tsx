
import React, { useState, useEffect } from 'react';
import { ICONS } from './Icons';
import { STORY_DATA, StoryItem } from '../data/story';
import { FadeUp } from './ui/Animations';
import { motion } from 'framer-motion';

// Separate component for each Story Card to handle individual image fetching
const StoryCard: React.FC<{ story: StoryItem, index: number, pronoun: string }> = ({ story, index, pronoun }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Map string key to Icon component
  const IconComponent = ICONS[story.icon as keyof typeof ICONS];

  useEffect(() => {
    const fetchImages = async () => {
      if (!story.jsonUrl) return;
      try {
        const response = await fetch(story.jsonUrl);
        const data = await response.json();
        if (data.resources && Array.isArray(data.resources)) {
          // Optimization: 
          // h_260: Height approx 2x of displayed height (128px) for retina, avoids fetching massive widths.
          // q_auto:low: Aggressive compression to prevent scroll lag since images are not clickable.
          const fetchedImages = data.resources.map((res: any) => 
            `https://res.cloudinary.com/dooptsu3i/image/upload/h_260,c_limit,q_auto:low,f_auto/${res.public_id}`
          );
          setImages(fetchedImages);
        }
      } catch (error) {
        console.error(`Error loading story ${story.id} images:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [story.jsonUrl, story.id]);

  // Replace default pronoun with dynamic one
  const dynamicContent = story.content.replace(/chúng mình/g, pronoun);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative pl-14"
    >
      {/* Icon/Number Marker - Glassy */}
      <div className="absolute left-0 top-0 w-11 h-11 bg-white/80 backdrop-blur-sm border border-brand-gold/30 rounded-full flex items-center justify-center shadow-md z-10">
          <IconComponent className="w-5 h-5 text-brand-dark" />
      </div>
      
      {/* Content Card - Transparent Glass */}
      <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl rounded-tl-none border border-white/60 shadow-sm hover:bg-white/60 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-brand-gold font-bold text-[10px] tracking-widest uppercase border border-brand-gold/30 px-2 py-0.5 rounded-full bg-white/50">
            Chapter {story.id}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-brand-dark mb-3 font-body">{story.title}</h3>
        {/* Added whitespace-pre-line to respect \n characters in data */}
        <p className="text-brand-dark/80 text-sm leading-relaxed text-justify mb-5 whitespace-pre-line">
          {dynamicContent}
        </p>

        {/* Images - Infinite Horizontal Auto-Scroll (Marquee) */}
        {loading ? (
           <div className="h-32 w-full bg-white/30 rounded-lg animate-pulse flex items-center justify-center">
              <span className="text-xs text-brand-dark/30">Đang tải ảnh...</span>
           </div>
        ) : images.length > 0 ? (
          <div className="relative w-full overflow-hidden -mx-2 bg-white/30 py-2 rounded-lg">
            <div 
              className="flex gap-3 w-max animate-scroll-left px-2"
              style={{ willChange: 'transform' }}
            >
              {/* Set 1 */}
              {images.map((img, imgIdx) => (
                  <img 
                      key={`orig-${story.id}-${imgIdx}`}
                      src={img}
                      alt={`${story.title} ${imgIdx}`}
                      className="h-32 w-auto max-w-none rounded-md shadow-sm flex-shrink-0 border border-white bg-white"
                      loading="eager" // Load immediately
                      decoding="async"
                  />
              ))}
              {/* Set 2 (Duplicate for Loop) */}
              {images.map((img, imgIdx) => (
                  <img 
                      key={`copy-${story.id}-${imgIdx}`}
                      src={img}
                      alt={`${story.title} ${imgIdx}`}
                      className="h-32 w-auto max-w-none rounded-md shadow-sm flex-shrink-0 border border-white bg-white"
                      loading="eager" // Load immediately
                      decoding="async"
                  />
              ))}
            </div>
          </div>
        ) : null}
        
      </div>
    </motion.div>
  );
};

interface LoveStoryProps {
  pronoun: string;
}

const LoveStory: React.FC<LoveStoryProps> = ({ pronoun }) => {
  return (
    <section className="px-4">
      <div className="container max-w-md mx-auto">
        <FadeUp>
          <div className="text-center mb-12">
            <h2 className="font-script text-4xl text-brand-dark mb-2">Chuyện tình yêu</h2>
            <div className="w-16 h-[2px] bg-brand-gold/40 mx-auto rounded-full"></div>
          </div>
        </FadeUp>

        <div className="relative">
          {/* Vertical Line - Dashed for softer look */}
          <motion.div 
            className="absolute left-[22px] top-4 bottom-4 w-[1px] border-l-2 border-dashed border-brand-dark/20" 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="space-y-12">
            {STORY_DATA.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} pronoun={pronoun} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
