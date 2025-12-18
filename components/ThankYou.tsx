
import React, { useState } from 'react';
import { ICONS } from './Icons';
import { FadeUp } from './ui/Animations';

interface ThankYouProps {
  guestName: string;
  pronoun: string;
}

const ThankYou: React.FC<ThankYouProps> = ({ guestName, pronoun }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      
      <div className="container max-w-md mx-auto text-center relative z-10">
        <FadeUp>
          <div className="mb-8 opacity-90 flex justify-center">
             <div className="w-40 h-40 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm border border-white/40">
                <ICONS.ThankYou className="w-28 h-28" />
             </div>
          </div>

          <h2 className="font-script text-6xl text-brand-dark mb-6 drop-shadow-sm">Cảm ơn</h2>
          
          <p className="text-brand-dark/80 font-body mb-10 leading-relaxed text-lg">
            Sự hiện diện của <span className="font-bold">{guestName}</span> là<br/>mảnh ghép hoàn hảo cho ngày vui của {pronoun}.
          </p>

          <div className="flex flex-col gap-4 max-w-xs mx-auto">
            <button 
              onClick={handleShare}
              className="bg-white/80 hover:bg-white text-brand-dark border border-brand-dark/5 font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {copied ? <ICONS.Check className="w-5 h-5 text-green-600" /> : <ICONS.Send className="w-5 h-5" />}
              {copied ? "Đã copy link!" : "Chia sẻ thiệp này"}
            </button>

            <button 
              onClick={handleScrollTop}
              className="text-brand-dark/50 text-sm hover:text-brand-dark underline decoration-brand-dark/20 py-2"
            >
              Xem lại từ đầu
            </button>
          </div>

          <div className="mt-20 flex items-center justify-center gap-2 opacity-30">
             <div className="h-[1px] w-10 bg-brand-dark"></div>
             <span className="text-[10px] uppercase tracking-widest text-brand-dark">Louis & Linh 2026</span>
             <div className="h-[1px] w-10 bg-brand-dark"></div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default ThankYou;
