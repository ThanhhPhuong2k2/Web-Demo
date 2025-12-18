
import React, { useState, useEffect } from 'react';
import { ICONS } from './Icons';
import { FadeUp } from './ui/Animations';
import { RSVPFormData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

// URL Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyj6ZvkVpjQwj67tLAXTNheUPOAL3JWJo8VgHuMkGY_4TnsNhT8J9wPTvFcOxYiJUH4Sg/exec"; 

// QR Configuration
const QR_CODES = {
  groom: {
    url: "https://res.cloudinary.com/dooptsu3i/image/upload/v1765727785/qr01_fyamwn.png",
    label: "Mừng Chú Rể",
    name: "Louis Trần"
  },
  bride: {
    url: "https://res.cloudinary.com/dooptsu3i/image/upload/v1765727786/qr02_h4il3l.png",
    label: "Mừng Cô Dâu",
    name: "Linh Soo"
  }
};

interface RSVPProps {
  guestName: string;
  pronoun: string;
}

const RSVP: React.FC<RSVPProps> = ({ guestName, pronoun }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  // State to handle QR Lightbox
  const [selectedQr, setSelectedQr] = useState<{url: string, label: string, name: string} | null>(null);

  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    phone: '',
    guests: 1, // Default 1 (Đi một mình)
    attending: 'yes',
    message: '',
    amount: '' // We keep this in state type for compatibility, but won't use it in UI
  });

  // Tự động điền tên khách nếu guestName không phải là "Bạn" (giá trị mặc định)
  useEffect(() => {
    if (guestName && guestName.toLowerCase() !== 'bạn') {
      setFormData(prev => ({ ...prev, name: guestName }));
    }
  }, [guestName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const dataToSend = {
      name: formData.name,
      phone: formData.phone, 
      status: formData.attending === 'yes' ? 'Tham dự' : (formData.attending === 'maybe' ? 'Có thể' : 'Tiếc quá'),
      message: formData.attending === 'yes' ? `(Đi ${formData.guests} người) ${formData.message}` : formData.message,
      amount: '' 
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', 
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.result === 'success') {
          setStatus('success');
        } else {
          throw new Error(result.error || 'Lỗi ghi dữ liệu vào Sheet.');
        }
      } else {
        throw new Error(`Lỗi Server: ${response.status}`);
      }

    } catch (error: any) {
      console.error("Lỗi gửi form:", error);
      if (error instanceof SyntaxError || error.message.includes('Failed to fetch') || error.type === 'opaque') {
         try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(dataToSend),
                headers: { 'Content-Type': 'text/plain' },
            });
            setStatus('success');
         } catch (retryErr) {
            setStatus('error');
            setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng kiểm tra internet và thử lại.');
         }
      } else {
        setStatus('error');
        setErrorMessage(`Có lỗi xảy ra: ${error.message}`);
      }
    }
  };

  const handleChange = (field: keyof RSVPFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (status === 'success') {
    return (
      <section id="rsvp" className="px-4 relative">
         <div className="container max-w-md mx-auto">
            <FadeUp>
              <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-10 text-center border border-white shadow-lg">
                <div className="w-20 h-20 bg-brand-light/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-brand-dark">
                  <ICONS.Check className="w-10 h-10" />
                </div>
                <h3 className="font-script text-4xl text-brand-dark mb-4">Cảm ơn {guestName}!</h3>
                <p className="font-body text-brand-dark/80 text-lg leading-relaxed">
                  {pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} đã nhận được thông tin.<br/>
                  Hẹn gặp lại trong ngày vui nhé!
                </p>
                <button 
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', phone: '', guests: 1, attending: 'yes', message: '', amount: '' });
                  }}
                  className="mt-8 text-sm text-brand-dark/60 underline hover:text-brand-dark font-medium"
                >
                  Gửi thêm phản hồi khác
                </button>
              </div>
            </FadeUp>
         </div>
      </section>
    );
  }

  return (
    <>
      <section id="rsvp" className="px-4 relative">
        <div className="container max-w-md mx-auto">
          <FadeUp>
            {/* Main Card with strong Blur */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-6 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] relative border border-white/60">
              <h2 className="font-script text-5xl text-brand-dark text-center mb-2">
                Xác nhận
              </h2>
              <p className="text-center text-brand-dark/60 text-sm mb-10 font-body uppercase tracking-wider">
                Để {pronoun} chuẩn bị chu đáo nhất
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 font-body">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-brand-dark/50 uppercase tracking-widest mb-1.5 ml-2">Tên của bạn</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        className="w-full bg-white/60 border border-brand-dark/5 rounded-2xl px-5 py-4 text-brand-dark placeholder-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-dark/10 focus:bg-white transition-all shadow-sm"
                        placeholder="Nhập tên..."
                      />
                  </div>
                  <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-brand-dark/50 uppercase tracking-widest mb-1.5 ml-2">Số điện thoại</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => handleChange('phone', e.target.value)}
                        className="w-full bg-white/60 border border-brand-dark/5 rounded-2xl px-5 py-4 text-brand-dark placeholder-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-dark/10 focus:bg-white transition-all shadow-sm"
                        placeholder="09xx..."
                      />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-dark/50 uppercase tracking-widest mb-2 ml-2">Bạn sẽ đến chứ?</label>
                  <div className="flex flex-col gap-3">
                      
                      <div 
                          onClick={() => handleChange('attending', 'yes')}
                          className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${formData.attending === 'yes' ? 'bg-brand-dark text-white shadow-lg scale-[1.02] border-transparent' : 'bg-white/40 border-white hover:bg-white text-brand-dark'}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.attending === 'yes' ? 'border-white' : 'border-brand-dark/30'}`}>
                          {formData.attending === 'yes' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                        </div>
                        <span className="font-bold">Chắc chắn tham dự!</span>
                      </div>

                      <div 
                          onClick={() => handleChange('attending', 'maybe')}
                          className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${formData.attending === 'maybe' ? 'bg-brand-gold text-white shadow-lg scale-[1.02] border-transparent' : 'bg-white/40 border-white hover:bg-white text-brand-dark'}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.attending === 'maybe' ? 'border-white' : 'border-brand-dark/30'}`}>
                          {formData.attending === 'maybe' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                        </div>
                        <span>Đang cân nhắc</span>
                      </div>

                      <div 
                          onClick={() => handleChange('attending', 'no')}
                          className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${formData.attending === 'no' ? 'bg-gray-500 text-white shadow-lg scale-[1.02] border-transparent' : 'bg-white/40 border-white hover:bg-white text-brand-dark'}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.attending === 'no' ? 'border-white' : 'border-brand-dark/30'}`}>
                          {formData.attending === 'no' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                        </div>
                        <span>Tiếc quá, mình bận mất rồi</span>
                      </div>
                  </div>
                </div>

                {formData.attending === 'yes' && (
                  <FadeUp duration={0.3}>
                    <label className="block text-[11px] font-bold text-brand-dark/50 uppercase tracking-widest mb-1.5 ml-2">Số người đi cùng</label>
                    <div className="relative">
                      <select 
                        value={formData.guests}
                        onChange={e => handleChange('guests', parseInt(e.target.value))}
                        className="w-full bg-white/60 border border-brand-dark/5 rounded-2xl px-5 py-4 text-brand-dark appearance-none focus:outline-none focus:ring-2 focus:ring-brand-dark/10"
                      >
                        <option value={1}>Đi một mình</option>
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={1 + num}>+{num} người</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark/50">▼</div>
                    </div>
                  </FadeUp>
                )}

                {/* Conditional: Money Gift (QR) */}
                {formData.attending === 'no' && (
                  <FadeUp duration={0.3}>
                    <div className="bg-white/50 p-6 rounded-2xl mb-4 border border-white">
                        <p className="text-sm text-brand-dark/80 mb-4 font-bold text-center">Gửi quà mừng từ xa:</p>
                        
                        {/* QR Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Groom QR */}
                          <div 
                            onClick={() => setSelectedQr(QR_CODES.groom)}
                            className="bg-white p-3 rounded-xl shadow-sm border border-brand-dark/5 cursor-zoom-in hover:scale-105 transition-transform"
                          >
                              <div className="aspect-square relative overflow-hidden rounded-lg mb-2">
                                <img 
                                  src={QR_CODES.groom.url} 
                                  alt="QR Louis" 
                                  className="w-full h-full object-contain" 
                                />
                              </div>
                              <p className="text-[10px] text-center font-bold text-brand-dark uppercase">{QR_CODES.groom.label}</p>
                              <p className="text-[9px] text-center text-brand-dark/60">{QR_CODES.groom.name}</p>
                          </div>

                          {/* Bride QR */}
                          <div 
                            onClick={() => setSelectedQr(QR_CODES.bride)}
                            className="bg-white p-3 rounded-xl shadow-sm border border-brand-dark/5 cursor-zoom-in hover:scale-105 transition-transform"
                          >
                              <div className="aspect-square relative overflow-hidden rounded-lg mb-2">
                                <img 
                                  src={QR_CODES.bride.url} 
                                  alt="QR Linh" 
                                  className="w-full h-full object-contain" 
                                />
                              </div>
                              <p className="text-[10px] text-center font-bold text-brand-dark uppercase">{QR_CODES.bride.label}</p>
                              <p className="text-[9px] text-center text-brand-dark/60">{QR_CODES.bride.name}</p>
                          </div>
                        </div>
                        
                        <p className="text-[10px] text-center text-gray-500 mt-3 italic">
                          (Chạm vào mã QR để xem rõ hơn & tải về)
                        </p>
                    </div>
                  </FadeUp>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-brand-dark/50 uppercase tracking-widest mb-1.5 ml-2">Lời nhắn gửi</label>
                  <textarea 
                    rows={3}
                    value={formData.message}
                    onChange={e => handleChange('message', e.target.value)}
                    className="w-full bg-white/60 border border-brand-dark/5 rounded-2xl px-5 py-4 text-brand-dark placeholder-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-dark/10 transition-all resize-none shadow-sm"
                    placeholder={`Gửi vài lời chúc đến ${pronoun} nhé...`}
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-100">
                    {errorMessage}
                  </p>
                )}

                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-brand-dark text-white font-bold text-lg py-4 rounded-2xl shadow-xl hover:bg-brand-dark/90 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                >
                  {status === 'submitting' ? 'Đang gửi...' : 'Gửi xác nhận'}
                </button>

              </form>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* QR Lightbox Modal */}
      <AnimatePresence>
        {selectedQr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/90 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedQr(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="bg-white p-6 rounded-[32px] max-w-sm w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
               <h3 className="text-center font-bold text-brand-dark text-lg mb-1">{selectedQr.label}</h3>
               <p className="text-center text-brand-dark/60 text-sm mb-4">{selectedQr.name}</p>
               
               <div className="bg-gray-50 rounded-xl p-2 mb-6 border border-gray-100">
                  <img 
                    src={selectedQr.url} 
                    alt="QR Large" 
                    className="w-full h-auto rounded-lg"
                  />
               </div>

               <div className="flex gap-3">
                 <button 
                    onClick={() => setSelectedQr(null)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                 >
                    Đóng
                 </button>
                 <a 
                    href={selectedQr.url} 
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-brand-dark text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-dark/90 transition-colors shadow-lg"
                 >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Tải QR
                 </a>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RSVP;
