
import React from 'react';
import { WEDDING_DATA } from '../data/wedding';
import { ICONS } from './Icons';
import { FadeUp } from './ui/Animations';

const EventCard: React.FC<{ 
  title: string; 
  date: string; 
  location: string; 
  desc: string; 
  mapLink: string; 
  bgImage: string;
}> = ({ title, date, location, desc, mapLink, bgImage }) => (
  <FadeUp className="mb-8 last:mb-0">
    {/* 
        Card Container 
        - Aspect square
    */}
    <div className="group relative rounded-[32px] overflow-hidden aspect-square shadow-xl border border-white/20 bg-gray-900">
      
      {/* 1. Background Image with Darker Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="venue" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90"
          loading="eager" // Load immediately
          decoding="async"
        />
        {/* Stronger gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
      </div>
      
      {/* 2. Content Centered */}
      <div className="relative z-10 p-6 flex flex-col items-center justify-center text-center h-full">
        
        {/* Icon */}
        <div className="mb-3 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-inner">
           <ICONS.Calendar className="w-5 h-5 text-white" />
        </div>

        {/* TITLE */}
        <h3 className="font-script text-5xl text-brand-gold mb-3 drop-shadow-md tracking-wide">
          {title}
        </h3>

        {/* 
            DATE - IMPROVED READABILITY 
            - Added bg-black/30 backdrop-blur
            - Increased font weight to extrabold
            - Increased text size
        */}
        <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full mb-5 shadow-lg">
           <span className="text-white font-extrabold text-sm uppercase tracking-[0.15em] drop-shadow-sm">
             {date.split('–')[0]}
           </span>
           <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse"/>
           <span className="text-white font-extrabold text-sm uppercase tracking-[0.15em] drop-shadow-sm">
             {date.split('–')[1]}
           </span>
        </div>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-white/30 mb-5"></div>

        {/* Location */}
        <h4 className="text-xl font-bold text-white mb-6 font-body leading-tight px-2 drop-shadow-md">
          {location}
        </h4>
        
        {/* Description - New Addition to display the dynamic text */}
        <p className="text-white/80 text-sm mb-6 px-4 italic font-light">
          {desc}
        </p>

        {/* Button */}
        <a 
          href={mapLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 
            bg-white/90 text-brand-dark 
            border border-white
            px-6 py-3 rounded-full 
            text-xs font-bold uppercase tracking-widest
            shadow-[0_0_15px_rgba(255,255,255,0.2)]
            hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]
            hover:bg-white hover:scale-105 active:scale-95
            transition-all duration-300
            backdrop-blur-sm
          "
        >
          <ICONS.MapPin className="w-4 h-4 text-brand-dark" />
          Chỉ đường
        </a>
      </div>
    </div>
  </FadeUp>
);

interface ScheduleProps {
  pronoun: string;
}

const Schedule: React.FC<ScheduleProps> = ({ pronoun }) => {
  // Thay thế từ "chúng mình" mặc định trong data bằng từ xưng hô động
  const ceremony2Desc = WEDDING_DATA.ceremony2.desc.replace('chúng mình', pronoun);

  return (
    <section id="schedule" className="px-4">
      <div className="container max-w-md mx-auto">
        <FadeUp>
           <div className="text-center mb-8">
             <h2 className="font-script text-5xl text-brand-dark mb-3">Lịch trình</h2>
             <div className="flex items-center justify-center gap-3 opacity-60">
                <div className="h-[1px] w-8 bg-brand-dark"></div>
                <p className="text-brand-dark text-xs uppercase tracking-widest font-body">Ngày vui</p>
                <div className="h-[1px] w-8 bg-brand-dark"></div>
             </div>
           </div>
        </FadeUp>

        {/* Card 1: Restaurant */}
        <EventCard 
          title={WEDDING_DATA.ceremony1.name}
          date={WEDDING_DATA.ceremony1.date}
          location={WEDDING_DATA.ceremony1.location}
          desc={WEDDING_DATA.ceremony1.desc}
          mapLink={WEDDING_DATA.ceremony1.mapLink}
          bgImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop"
        />

        {/* Card 2: Home */}
        <EventCard 
          title={WEDDING_DATA.ceremony2.name}
          date={WEDDING_DATA.ceremony2.date}
          location={WEDDING_DATA.ceremony2.location}
          desc={ceremony2Desc} 
          mapLink={WEDDING_DATA.ceremony2.mapLink}
          bgImage="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop"
        />
      </div>
    </section>
  );
};

export default Schedule;
