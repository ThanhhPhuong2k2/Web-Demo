
import React from 'react';
import { WEDDING_DATA } from '../data/wedding';
import { ICONS } from './Icons';
import { FadeUp } from './ui/Animations';

interface FamilyInfoProps {
  guestName: string;
}

const FamilyInfo: React.FC<FamilyInfoProps> = ({ guestName }) => {
  return (
    <section id="family" className="px-4 relative pt-8">
      <div className="container max-w-md mx-auto">
        <FadeUp>
          {/* 
              Card Glass Effect 
              Update: p-3 on mobile to maximize width for names
          */}
          <div className="bg-white/60 backdrop-blur-md rounded-[32px] shadow-sm p-3 md:p-8 border border-white/60 relative mt-6">
             
             {/* Subtle internal gradient */}
             <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/50 to-transparent pointer-events-none rounded-t-[32px]" />

             {/* Decorative top center */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-16 h-16 bg-[#F9F9F7] rounded-full flex items-center justify-center shadow-md border border-white">
                   <ICONS.DecorationFlower className="w-10 h-10 opacity-80" />
                </div>
             </div>

            <h2 className="text-center font-script text-4xl text-brand-dark mb-10 mt-12 drop-shadow-sm relative z-10">
              Gia đình hai bên
            </h2>

            {/* Use flex-row to ensure side-by-side layout on ALL screens */}
            {/* Update: gap-1 on mobile, larger gap on desktop */}
            <div className="flex flex-row justify-between items-start relative z-10 gap-1 md:gap-4">
              
              {/* Divider Line - Centered Vertical */}
              <div className="absolute left-1/2 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-brand-dark/20 to-transparent -translate-x-1/2" />

              {/* Groom Side */}
              <div className="text-center flex-1 pr-0.5 md:pr-1 overflow-hidden">
                <h3 className="font-bold text-brand-dark/80 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] mb-4 pb-1 inline-block border-b border-brand-dark/10">
                  Nhà Trai
                </h3>
                <div className="space-y-2 md:space-y-3 text-brand-dark font-body">
                  {/* 
                      Fix: text-[3.2vw] scales font relative to screen width on mobile.
                      sm:text-base resets to fixed size on larger screens.
                      whitespace-nowrap prevents line break.
                  */}
                  <p className="font-bold text-[3.2vw] sm:text-base md:text-lg tracking-tighter md:tracking-tight whitespace-nowrap">
                    {WEDDING_DATA.groom.father}
                  </p>
                  <p className="font-bold text-[3.2vw] sm:text-base md:text-lg tracking-tighter md:tracking-tight whitespace-nowrap">
                    {WEDDING_DATA.groom.mother}
                  </p>
                </div>
              </div>

              {/* Bride Side */}
              <div className="text-center flex-1 pl-0.5 md:pl-1 overflow-hidden">
                <h3 className="font-bold text-brand-dark/80 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] mb-4 pb-1 inline-block border-b border-brand-dark/10">
                  Nhà Gái
                </h3>
                <div className="space-y-2 md:space-y-3 text-brand-dark font-body">
                  <p className="font-bold text-[3.2vw] sm:text-base md:text-lg tracking-tighter md:tracking-tight whitespace-nowrap">
                    {WEDDING_DATA.bride.father}
                  </p>
                  <p className="font-bold text-[3.2vw] sm:text-base md:text-lg tracking-tighter md:tracking-tight whitespace-nowrap">
                    {WEDDING_DATA.bride.mother}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center relative z-10">
              <div className="w-12 h-[1px] bg-brand-dark/20 mx-auto mb-6" />
              <p className="text-brand-dark/80 font-body italic leading-relaxed text-sm">
                Trân trọng kính mời <span className="font-bold text-brand-dark">{guestName}</span> đến chung vui trong ngày <br/>
                <span className="font-bold text-brand-dark">Lễ Vu Quy</span> và <span className="font-bold text-brand-dark">Lễ Thành Hôn</span><br/>
                của <span className="font-script text-3xl mx-1 text-brand-dark">{WEDDING_DATA.groom.name}</span> & <span className="font-script text-3xl mx-1 text-brand-dark">{WEDDING_DATA.bride.name}</span> <br/>
                cùng gia đình hai bên.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default FamilyInfo;
