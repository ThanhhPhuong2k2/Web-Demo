
import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from './Icons';

// CẬP NHẬT: Đường dẫn đến file nhạc mới trên Cloudinary
const SONG_URL = "https://res.cloudinary.com/dooptsu3i/video/upload/v1765291542/50_N%C4%83m_V%E1%BB%81_Sau_Lofi_Acoustic_-_F47_Cover_%C4%90%E1%BA%B7ng_Thanh_Tuy%E1%BB%81n_x_CaoTri_-_Nguy%E1%BB%87n_C%E1%BA%A7u_%C4%90%E1%BA%BFn_50_N%C4%83m_V%E1%BB%81_Sau_jk6da4.mp3"; 

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startAt = 76; // Giây thứ 76

    // 1. Hàm set thời gian ban đầu
    const setInitialTime = () => {
        if (audio.currentTime < startAt) {
            audio.currentTime = startAt;
        }
    };

    audio.addEventListener('loadedmetadata', setInitialTime);
    if (audio.readyState >= 1) setInitialTime();

    // 2. Hàm kích hoạt play nhạc
    const handleUserInteraction = async () => {
      try {
        if (audio.paused) {
           if (audio.currentTime < startAt) {
               audio.currentTime = startAt;
           }
           await audio.play();
           setIsPlaying(true);
        }
      } catch (error) {}

      if (!audio.paused) {
          removeInteractionListeners();
      }
    };

    const events = ['click', 'touchstart', 'keydown', 'scroll', 'wheel'];

    const addInteractionListeners = () => {
        events.forEach(event => document.addEventListener(event, handleUserInteraction, { passive: true }));
    };

    const removeInteractionListeners = () => {
        events.forEach(event => document.removeEventListener(event, handleUserInteraction));
    };

    handleUserInteraction();
    addInteractionListeners();

    return () => {
        audio.removeEventListener('loadedmetadata', setInitialTime);
        removeInteractionListeners();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <audio 
        ref={audioRef} 
        src={SONG_URL} 
        loop 
        preload="auto"
      />
      
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        className={`
          relative w-10 h-10 rounded-full flex items-center justify-center
          bg-black/20 backdrop-blur-md border border-white/30
          shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300
          active:scale-90 hover:bg-black/30
          ${isPlaying ? 'animate-spin-slow' : ''}
        `}
      >
        {/* Glow effect khi đang phát */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-brand-gold/30 blur-md animate-pulse" />
        )}
        
        {isPlaying ? (
          <ICONS.MusicNote className="w-5 h-5 text-white drop-shadow-md" />
        ) : (
          <div className="relative flex items-center justify-center">
             <ICONS.MusicNote className="w-5 h-5 text-white/60" />
             {/* Gạch chéo biểu thị trạng thái tắt */}
             <div className="absolute w-[130%] h-[1.5px] bg-white/80 rotate-45 rounded-full shadow-sm" />
          </div>
        )}
      </button>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
