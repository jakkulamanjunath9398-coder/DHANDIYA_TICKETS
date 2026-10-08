import React, { useState } from 'react';
import { CrossedDandiyaSticks } from './FestiveIcons';
import { isSoundEnabled, toggleSound, playDandiyaClack } from '../utils/audio';
import { Volume2, VolumeX, Menu, X, Ticket, Search, ShieldAlert, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: 'home' | 'book' | 'my-ticket' | 'admin' | 'highlights') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleTabClick = (tab: 'home' | 'book' | 'my-ticket' | 'admin' | 'highlights') => {
    playDandiyaClack();
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playDandiyaClack();
  };

  return (
    <nav className="no-print sticky top-0 z-50 backdrop-blur-xl bg-[#0e0517]/85 border-b border-amber-500/20 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="relative p-2 rounded-2xl bg-gradient-to-br from-amber-500/20 via-rose-500/10 to-purple-600/20 border border-amber-500/40 shadow-inner group-hover:scale-105 transition-transform">
              <CrossedDandiyaSticks size={32} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  Navratri Mahotsav
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-cinzel text-amber-200 tracking-tight group-hover:text-amber-300 transition-colors">
                DANDIYA NIGHT <span className="text-rose-400">2026</span>
              </h1>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => handleTabClick('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'home'
                  ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30 shadow-sm'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleTabClick('highlights')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'highlights'
                  ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              Event Highlights
            </button>

            <button
              onClick={() => handleTabClick('book')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'book'
                  ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              Book Tickets
            </button>

            <button
              onClick={() => handleTabClick('my-ticket')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'my-ticket'
                  ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              <Search className="w-4 h-4 text-amber-400" />
              Find My Ticket
            </button>

            <button
              onClick={() => handleTabClick('admin')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'admin'
                  ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Admin Portal
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={handleToggleSound}
              className="p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 transition-all cursor-pointer"
              title={soundOn ? 'Sound On (Festive Dandiya clacks enabled)' : 'Muted'}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-500" />
              )}
            </button>

            {/* Quick CTA */}
            <button
              onClick={() => handleTabClick('book')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:shadow-rose-500/30 hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              Book Passes
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-stone-900 text-stone-300 border border-stone-800"
              title="Sound Toggle"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-stone-900 text-stone-300 hover:text-amber-300 border border-stone-800 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#130720] border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <button
            onClick={() => handleTabClick('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
              currentTab === 'home' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-200'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleTabClick('highlights')}
            className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
              currentTab === 'highlights' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-200'
            }`}
          >
            Event Highlights
          </button>
          <button
            onClick={() => handleTabClick('book')}
            className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
              currentTab === 'book' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-200'
            }`}
          >
            <span>Book Tickets</span>
            <span className="text-xs bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded-full">
              Selling Fast
            </span>
          </button>
          <button
            onClick={() => handleTabClick('my-ticket')}
            className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
              currentTab === 'my-ticket' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-200'
            }`}
          >
            Find My Ticket (QR Search)
          </button>
          <button
            onClick={() => handleTabClick('admin')}
            className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
              currentTab === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-200'
            }`}
          >
            Admin Dashboard
          </button>

          <div className="pt-2">
            <button
              onClick={() => handleTabClick('book')}
              className="w-full py-3 rounded-xl font-bold text-center bg-gradient-to-r from-amber-500 to-rose-500 text-stone-950 shadow-lg cursor-pointer"
            >
              Book Passes Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
