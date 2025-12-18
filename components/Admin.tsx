
import React, { useState, useEffect } from 'react';
import { ICONS } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

const Admin: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [pronounCode, setPronounCode] = useState('b'); // b: mình, e: em, c: con
  const [generatedLink, setGeneratedLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (guestName.trim()) {
      const baseUrl = window.location.origin;
      const encodedName = encodeURIComponent(guestName.trim());
      // Tạo link hoàn chỉnh với tham số g (guest) và p (pronoun)
      setGeneratedLink(`${baseUrl}/?g=${encodedName}&p=${pronounCode}`);
    } else {
      setGeneratedLink('');
    }
  }, [guestName, pronounCode]);

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleOpen = () => {
    if (!generatedLink) return;
    window.open(generatedLink, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-50">
       <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-8 w-full max-w-md shadow-2xl border border-white">
          <div className="text-center mb-6">
             <div className="w-16 h-16 bg-brand-dark text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ICONS.DoubleHappiness className="w-8 h-8" />
             </div>
             <h2 className="font-script text-4xl text-brand-dark">Công cụ tạo link</h2>
             <p className="text-sm text-brand-dark/60 font-body mt-2 italic">Tùy biến xưng hô theo vai vế</p>
          </div>

          <div className="space-y-5 font-body">
             {/* 1. Nhập tên */}
             <div>
                <label className="block text-[11px] font-bold text-brand-dark/50 uppercase tracking-widest mb-2 ml-1">
                   Tên Khách Mời (Hiện trên thiệp)
                </label>
                <input 
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ví dụ: Mẹ Loan, Anh Nam..."
                  className="w-full bg-white border border-brand-dark/10 rounded-xl px-4 py-3 text-lg text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all shadow-sm"
                />
             </div>

             {/* 2. Chọn xưng hô */}
             <div>
                <label className="block text-[11px] font-bold text-brand-dark/50 uppercase tracking-widest mb-2 ml-1">
                   Xưng hô của Chú Rể & Cô Dâu
                </label>
                <div className="grid grid-cols-3 gap-2">
                   <button 
                      onClick={() => setPronounCode('c')}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${pronounCode === 'c' ? 'bg-brand-dark text-white border-brand-dark shadow-md' : 'bg-white text-brand-dark/60 border-brand-dark/10 hover:bg-gray-50'}`}
                   >
                      Chúng con
                      <span className="block text-[8px] font-normal opacity-70 uppercase tracking-tighter">(Gửi Bố Mẹ/Bác)</span>
                   </button>
                   <button 
                      onClick={() => setPronounCode('e')}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${pronounCode === 'e' ? 'bg-brand-dark text-white border-brand-dark shadow-md' : 'bg-white text-brand-dark/60 border-brand-dark/10 hover:bg-gray-50'}`}
                   >
                      Chúng em
                      <span className="block text-[8px] font-normal opacity-70 uppercase tracking-tighter">(Gửi Anh/Chị)</span>
                   </button>
                   <button 
                      onClick={() => setPronounCode('b')}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${pronounCode === 'b' ? 'bg-brand-dark text-white border-brand-dark shadow-md' : 'bg-white text-brand-dark/60 border-brand-dark/10 hover:bg-gray-50'}`}
                   >
                      Chúng mình
                      <span className="block text-[8px] font-normal opacity-70 uppercase tracking-tighter">(Gửi Bạn bè/Em)</span>
                   </button>
                </div>
             </div>

             {/* 3. Hiển thị & Copy */}
             <AnimatePresence>
               {generatedLink && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-3 pt-2"
                 >
                    <div className="bg-brand-light/30 rounded-2xl p-4 border border-brand-dark/5 break-all shadow-inner group relative">
                       <p className="text-[10px] text-brand-dark/40 mb-1 font-bold uppercase tracking-tight">Link gửi khách:</p>
                       <p className="text-brand-dark text-[13px] font-mono leading-tight">{generatedLink}</p>
                    </div>

                    <div className="flex gap-2">
                       <button 
                          onClick={handleCopy}
                          className={`
                            flex-1 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95
                            ${isCopied ? 'bg-green-600 text-white' : 'bg-brand-dark text-white hover:bg-brand-dark/90'}
                          `}
                       >
                          {isCopied ? <ICONS.Check className="w-4 h-4" /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>}
                          {isCopied ? 'Đã sao chép' : 'Sao chép link'}
                       </button>

                       <button 
                          onClick={handleOpen}
                          className="w-14 h-14 rounded-xl bg-white text-brand-dark border border-brand-dark/10 hover:bg-gray-50 flex items-center justify-center transition-all shadow-md active:scale-95"
                          title="Xem thử thiệp này"
                       >
                          <ICONS.Send className="w-5 h-5" />
                       </button>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
       </div>
    </div>
  );
};

export default Admin;
