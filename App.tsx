
import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Hero from './components/Hero';
import FamilyInfo from './components/FamilyInfo';
import Invitation from './components/Invitation';
import Schedule from './components/Schedule';
import Album from './components/Album';
import LoveStory from './components/LoveStory';
import RSVP from './components/RSVP';
import ThankYou from './components/ThankYou';
import BottomNav from './components/BottomNav';
import MusicPlayer from './components/MusicPlayer';
import Admin from './components/Admin';

const App: React.FC = () => {
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [guestName, setGuestName] = useState("Bạn");
  const [pronoun, setPronoun] = useState("chúng mình"); // Mặc định là chúng mình
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    // 1. Phân tích URL
    const params = new URLSearchParams(window.location.search);
    
    // Check chế độ Admin (?mode=admin)
    if (params.get('mode') === 'admin') {
      setIsAdminMode(true);
      setHasSeenIntro(true); 
      return;
    }

    // Check tên khách (?g=TenKhach)
    const gParam = params.get('g');
    if (gParam) {
      setGuestName(decodeURIComponent(gParam));
    }

    // Check đại từ xưng hô (?p=c|e|b)
    const pParam = params.get('p');
    if (pParam === 'c') {
      setPronoun("chúng con"); // Con
    } else if (pParam === 'e') {
      setPronoun("chúng em"); // Em
    } else {
      setPronoun("chúng mình"); // Bạn/Mặc định
    }

  }, []);

  // Nếu là Admin Mode, chỉ render trang Admin
  if (isAdminMode) {
    return (
      <main className="min-h-screen font-body text-gray-900 bg-[#EBEBE6] relative overflow-hidden">
          <div className="bg-noise" />
          <Admin />
      </main>
    );
  }

  return (
    <main className="min-h-screen font-body text-gray-900 overflow-x-hidden selection:bg-brand-gold/30 relative">
      
      {/* GLOBAL AMBIENT BACKGROUND */}
      <div className="fixed inset-0 z-[-10] bg-[#F9F9F7] overflow-hidden">
        {/* Noise overlay defined in index.html */}
        <div className="bg-noise" />
        
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-light/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-100/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000" />
      </div>

      <MusicPlayer />

      {!hasSeenIntro && (
        <Onboarding onComplete={() => setHasSeenIntro(true)} />
      )}

      {/* Main Content */}
      <div className={hasSeenIntro ? "opacity-100 transition-opacity duration-1000" : "opacity-0 h-screen overflow-hidden"}>
        {/* Truyền pronoun xuống các components cần thay đổi xưng hô */}
        <Hero pronoun={pronoun} />
        <div className="relative z-10 space-y-12 pb-32 pt-10">
          <FamilyInfo guestName={guestName} />
          <Invitation guestName={guestName} pronoun={pronoun} />
          <Schedule pronoun={pronoun} />
          <Album />
          <LoveStory pronoun={pronoun} />
          <RSVP guestName={guestName} pronoun={pronoun} />
          <ThankYou guestName={guestName} pronoun={pronoun} />
        </div>
        <BottomNav />
      </div>

    </main>
  );
};

export default App;
