
import React, { useEffect, useState, useRef } from 'react';
import { ICONS } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

type SectionId = 'family' | 'schedule' | 'album' | 'rsvp';

const TABS: { id: SectionId; label: string; icon: React.ComponentType<any> }[] = [
  { id: 'family',   label: 'Thiệp', icon: ICONS.DoubleHappiness },
  { id: 'schedule', label: 'Lịch',  icon: ICONS.NavCalendar },
  { id: 'album',    label: 'Album', icon: ICONS.NavAlbum },
  { id: 'rsvp',     label: 'Xác nhận',  icon: ICONS.NavRSVP },
];

const BottomNav: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('family');
  
  // Ref để chặn sự kiện scroll spy khi người dùng tự click vào menu
  const isManualScrolling = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Logic hiện ẩn Nav
      if (window.scrollY > window.innerHeight * 0.8) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      // 2. Logic Scroll Spy (Chỉ chạy nếu không phải do người dùng click)
      if (isManualScrolling.current) return;

      const ids: SectionId[] = ['family', 'schedule', 'album', 'rsvp'];
      let current: SectionId = 'family';
      // Lấy điểm giữa màn hình
      const checkPoint = window.innerHeight * 0.5;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        
        // Nếu phần tử đang chiếm lĩnh điểm giữa màn hình
        if (rect.top <= checkPoint && rect.bottom >= checkPoint) {
          current = id;
          break; 
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollTo = (id: SectionId) => {
    // Bật cờ đang scroll thủ công
    isManualScrolling.current = true;
    
    // Update UI ngay lập tức để mượt
    setActiveSection(id); 

    const element = document.getElementById(id);
    if (element) {
        const yOffset = -80; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Reset cờ sau khi scroll xong (ước lượng 1s cho smooth scroll)
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center pointer-events-none">
          <div className="pb-[env(safe-area-inset-bottom)]">
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200,
                mass: 0.8
              }}
              className="pointer-events-auto"
            >
              {/* 
                  Fix Visibility:
                  - Icons/Text đổi sang màu tối (brand-dark) vì nền web chủ yếu là sáng.
                  - Thêm bg-white/20 nhẹ để tách biệt khỏi nội dung nền nếu nó quá rối, nhưng vẫn giữ độ trong suốt cao.
              */}
              <div
                className="
                  relative p-1 rounded-full
                  bg-white/20
                  backdrop-blur-[4px]
                  border border-brand-dark/5
                  shadow-xl
                  overflow-hidden
                "
              >
                <nav className="relative flex items-center w-[300px] justify-between">
                  {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSection === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => scrollTo(tab.id)}
                        className="relative flex-1 h-14 flex flex-col items-center justify-center cursor-pointer select-none group outline-none"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        {/* 
                            ACTIVE PILL
                            - Darker tint for visibility on light mode
                        */}
                        {isActive && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'rgba(26, 77, 46, 0.08)',
                              boxShadow: 'inset 0 0 0 1px rgba(26, 77, 46, 0.05)',
                            }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 250, 
                              damping: 26
                            }}
                          />
                        )}

                        {/* ICON & LABEL CONTENT */}
                        <div className="relative z-10 flex flex-col items-center justify-center w-full">
                          <motion.div
                            animate={{ 
                              y: isActive ? -2 : 1,
                              scale: isActive ? 1.1 : 1
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon 
                              className={`w-5 h-5 transition-all duration-300 ${
                                isActive 
                                  ? 'text-brand-dark' 
                                  : 'text-brand-dark/50 group-hover:text-brand-dark/70'
                              }`} 
                              strokeWidth={isActive ? 2 : 1.5}
                            />
                          </motion.div>
                          
                          <motion.span
                            initial={false}
                            animate={{
                                opacity: isActive ? 1 : 0.6,
                                y: isActive ? 2 : 4,
                                scale: isActive ? 1 : 0.9,
                            }}
                            transition={{ duration: 0.25 }}
                            className={`mt-0.5 text-[9px] font-bold tracking-wider uppercase ${
                              isActive ? 'text-brand-dark' : 'text-brand-dark/50'
                            }`}
                          >
                            {tab.label}
                          </motion.span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BottomNav;
