import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS, TICKET_CATEGORIES, TicketCategoryId } from '../types';
import { CrossedDandiyaSticks, FestiveDiya } from './FestiveIcons';
import { playDandiyaClack } from '../utils/audio';
import { 
  Calendar, Clock, MapPin, Sparkles, Music, UtensilsCrossed, 
  Trophy, Camera, Users, ShieldCheck, Flame, ArrowRight, 
  ChevronRight, HeartHandshake, CheckCircle2, Ticket
} from 'lucide-react';

interface HomePageProps {
  onBookNow: (category?: TicketCategoryId) => void;
  onViewMyTicket: () => void;
  onExploreHighlights: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onBookNow, 
  onViewMyTicket, 
  onExploreHighlights 
}) => {
  // Live festive countdown timer to event date (October 18, 2026)
  const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 8, minutes: 36, seconds: 15 });

  useEffect(() => {
    const targetDate = new Date('2026-10-18T18:30:00+05:30').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCategorySelect = (id: TicketCategoryId) => {
    playDandiyaClack();
    onBookNow(id);
  };

  return (
    <div className="min-h-screen bg-mandala text-stone-100 festive-pattern pb-20">
      
      {/* =========================================================================
          HERO SECTION: Festive Garba & Dandiya Stage
         ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-amber-500/20">
        
        {/* Ambient festive light orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top festive banner badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold shadow-inner">
              <FestiveDiya size={18} />
              <span>शुभ नवरात्रि · Navratri Maha Raas Mahotsav 2026</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Title with crossed dandiya graphics */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4">
              <div className="hidden sm:block rotate-dandiya-left opacity-90 animate-pulse">
                <CrossedDandiyaSticks size={52} />
              </div>

              <div>
                <span className="text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-amber-400 block mb-2 font-mono">
                  THE BIGGEST FESTIVE CARNIVAL OF BENGALURU
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-cinzel tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 drop-shadow-md">
                  DANDIYA NIGHT 2026
                </h1>
                <p className="font-festive text-2xl sm:text-3xl text-rose-300 mt-2 tracking-wide">
                  રાસ ગરબા અને દાંડિયા ઉત્સવ
                </p>
              </div>

              <div className="hidden sm:block rotate-dandiya-right opacity-90 animate-pulse">
                <CrossedDandiyaSticks size={52} />
              </div>
            </div>

            {/* Short Event Description */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Step into an electrifying evening of rhythmic Garba beats, swirling Chaniya Cholis, live Bollywood & Gujarati folk DJ, delectable festive street food, and prizes galore under a starlit open-air palace arena!
            </p>

            {/* Event Key Details Pill Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-10 text-left">
              <div className="p-4 rounded-2xl bg-stone-900/70 border border-amber-500/30 backdrop-blur-md flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 font-bold">Date</div>
                  <div className="text-sm font-bold text-stone-100">{EVENT_DETAILS.date}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/70 border border-amber-500/30 backdrop-blur-md flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 font-bold">Time</div>
                  <div className="text-sm font-bold text-stone-100">{EVENT_DETAILS.time}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/70 border border-amber-500/30 backdrop-blur-md flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 font-bold">Venue</div>
                  <div className="text-sm font-bold text-stone-100 truncate">{EVENT_DETAILS.venueName}</div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => {
                  playDandiyaClack();
                  onBookNow();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-black rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-stone-950 shadow-xl shadow-amber-500/30 hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Ticket className="w-5 h-5 text-stone-950" />
                Book Tickets Now
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  playDandiyaClack();
                  onViewMyTicket();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-amber-200 border-2 border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer"
              >
                View My Ticket (QR)
              </button>
            </div>

            {/* Countdown Box */}
            <div className="max-w-xl mx-auto bg-stone-950/60 p-5 rounded-3xl border border-amber-500/20 backdrop-blur-sm">
              <div className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-3 flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                Event Starts In
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="p-2 sm:p-3 rounded-xl bg-stone-900/90 border border-stone-800">
                  <div className="text-2xl sm:text-3xl font-black font-cinzel text-amber-300">{timeLeft.days}</div>
                  <div className="text-[10px] sm:text-xs text-stone-400 uppercase font-semibold">Days</div>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-stone-900/90 border border-stone-800">
                  <div className="text-2xl sm:text-3xl font-black font-cinzel text-amber-300">{timeLeft.hours}</div>
                  <div className="text-[10px] sm:text-xs text-stone-400 uppercase font-semibold">Hours</div>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-stone-900/90 border border-stone-800">
                  <div className="text-2xl sm:text-3xl font-black font-cinzel text-amber-300">{timeLeft.minutes}</div>
                  <div className="text-[10px] sm:text-xs text-stone-400 uppercase font-semibold">Mins</div>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-stone-900/90 border border-stone-800">
                  <div className="text-2xl sm:text-3xl font-black font-cinzel text-rose-400">{timeLeft.seconds}</div>
                  <div className="text-[10px] sm:text-xs text-stone-400 uppercase font-semibold">Secs</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          EVENT HIGHLIGHTS SECTION: Live DJ, Dandiya, Food, Games, Dance
         ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">
              EXPERIENCE THE UTSAV
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-cinzel text-amber-200 mt-2 mb-4">
              Festive Highlights & Attractions
            </h2>
            <p className="text-stone-300 text-sm sm:text-base">
              From heart-thumping traditional dhol beats to sizzling Gujarati delicacies, everything is crafted for an unforgettable festival of colors and dance.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Live DJ & Folk Beats */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-amber-500/25 hover:border-amber-400/60 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-5 group-hover:scale-110 transition-transform">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-amber-200 mb-2">
                Live DJ & Folk Dhol Troupes
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                Non-stop high-voltage mashups by Celebrity DJ Akhil paired with authentic live Nasik and Gujarati Puneri Dhol drummers to keep you dancing all night.
              </p>
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                <span>Bollywood & Sanedo Beats</span>
              </div>
            </div>

            {/* 2. Free Dandiya Sticks */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-rose-500/25 hover:border-rose-400/60 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-5 group-hover:scale-110 transition-transform">
                <CrossedDandiyaSticks size={30} />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-rose-200 mb-2">
                Dandiya Sticks & Accessories
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                Handcrafted colorful wooden Dandiya sticks provided with VIP, Couple, and Group passes. Extra pairs & glowing LED sticks available at venue counters.
              </p>
              <div className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                <span>Hand-carved Wooden Pairs</span>
              </div>
            </div>

            {/* 3. Food Street & Chaat Bazaar */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-emerald-500/25 hover:border-emerald-400/60 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-5 group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-emerald-200 mb-2">
                Royal Food Street & Chaat Bazaar
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                25+ curated gourmet stalls featuring piping hot Jalebi & Fafda, Kutchi Dabeli, Mumbai Pav Bhaji, Pav Bhaji, live Dosa counters, mocktails, and Kulfis.
              </p>
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span>100% Pure Vegetarian & Jain Options</span>
              </div>
            </div>

            {/* 4. Garba Competitions & Prizes */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-amber-500/25 hover:border-amber-400/60 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-5 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-amber-200 mb-2">
                Competitions & Mega Prizes
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                Cash prizes, hampers & trophies for: Best Traditional Attire (Male & Female), Best Couple Dancer, Best Dandiya Swag, and Kids Garba Champion.
              </p>
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                <span>₹50,000+ Total Prize Pool</span>
              </div>
            </div>

            {/* 5. 360 Photo Booth & Selfie Zones */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-purple-500/25 hover:border-purple-400/60 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mb-5 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-purple-200 mb-2">
                360° Glam Booth & Neon Zones
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                Capture your dazzling ethnic look with slow-mo 360° video spinners, mirror selfie photo booths, and neon-lit Kathiyawadi umbrella installations.
              </p>
              <div className="text-xs font-semibold text-purple-400 flex items-center gap-1">
                <span>Instant Phone Download Video</span>
              </div>
            </div>

            {/* 6. Grand Wooden Floor Dance Arena */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-rose-500/25 hover:border-rose-400/60 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-cinzel text-rose-200 mb-2">
                35,000 Sq. Ft. Cushioned Arena
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                Specially designed dust-free wooden dance flooring with concert-grade surround sound, cold pyro firework effects, and high-capacity ventilation.
              </p>
              <div className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                <span>Safe Family & Kid-Friendly Atmosphere</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          TICKET PRICING SECTION: Regular, VIP, Couple, Group
         ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">
              OFFICIAL PASSES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-amber-200 mt-2 mb-4">
              Select Your Entry Passes
            </h2>
            <p className="text-stone-300 text-sm sm:text-base">
              Choose from Regular, VIP, Couple, and Group categories. Instant QR code ticket generated upon booking with full print and PDF download support.
            </p>
          </div>

          {/* Ticket Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TICKET_CATEGORIES.map((cat) => (
              <div 
                key={cat.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 bg-stone-900/80 border ${
                  cat.recommended 
                    ? 'border-rose-500 shadow-2xl shadow-rose-500/20 scale-102 ring-1 ring-rose-500' 
                    : 'border-amber-500/30 hover:border-amber-400/60'
                }`}
              >
                {/* Popular / Recommended Pill */}
                {cat.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-rose-500 to-amber-500 text-stone-950 shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold font-cinzel text-amber-200">{cat.name}</h3>
                    <span className="text-xs font-mono text-stone-400">
                      Admit {cat.entryCount} {cat.entryCount === 1 ? 'Person' : 'Persons'}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 mb-4 min-h-[32px]">{cat.tagline}</p>

                  {/* Price */}
                  <div className="mb-6 p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-stone-400">₹</span>
                      <span className="text-3xl sm:text-4xl font-black font-cinzel text-amber-300">
                        {cat.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-400">/ pass</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                      All festival taxes included
                    </div>
                  </div>

                  {/* Inclusions List */}
                  <div className="space-y-2.5 mb-6 text-xs text-stone-300">
                    {cat.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select button */}
                <button
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    cat.recommended
                      ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-stone-950 hover:brightness-110 shadow-lg'
                      : 'bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-amber-200 border border-amber-500/40'
                  }`}
                >
                  Book {cat.name}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Info Bar */}
          <div className="mt-12 p-6 rounded-3xl bg-amber-950/20 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-sm text-stone-300">
                <strong className="text-amber-200">100% Genuine Tickets:</strong> Instant high-resolution QR pass generated on payment. No paper prints mandatory at gate; digital mobile QR entry accepted.
              </div>
            </div>
            <button
              onClick={() => {
                playDandiyaClack();
                onViewMyTicket();
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-amber-300 bg-stone-900 hover:bg-stone-800 border border-amber-500/30 whitespace-nowrap cursor-pointer"
            >
              Already booked? Check status →
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          EVENT SCHEDULE TIMELINE
         ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">
              EVENING RHYTHM
            </span>
            <h2 className="text-3xl font-black font-cinzel text-amber-200 mt-2">
              Event Schedule & Timeline
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { time: '5:30 PM', title: 'Gates Open & Turnstile Check-in', desc: 'Wristband distribution, Dandiya sticks collection for VIP/Couple/Group pass holders, and photo-booths open.' },
              { time: '6:30 PM', title: 'Maha Aarti & Ganesh Vandana', desc: 'Auspicious lamp lighting, Navratri prayer song and blessing ceremony with temple priests.' },
              { time: '7:00 PM', title: 'Folk Raas Garba Circles (Be Taali / Tran Taali)', desc: 'Traditional slow and fast paced circular Garba steps with live folk singers from Gujarat.' },
              { time: '8:45 PM', title: 'Mega Dandiya Raas with Live DJ', desc: 'Bollywood Dandiya remixes, fusion mashups, and energetic high-tempo Dandiya stick clashing.' },
              { time: '10:30 PM', title: 'Grand Finale, Awards & Contest Winners', desc: 'Felicitation of Best Dancers, Best Chaniya Choli, and Best Garba Couple awards.' },
              { time: '11:30 PM', title: 'Closing Celebrations & Food Carnival wrap-up', desc: 'Sweet distribution (Mohanthal & Jalebi) and heartfelt festive farewell.' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-24 shrink-0 font-mono text-sm font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 text-center">
                  {item.time}
                </div>
                <div>
                  <h4 className="text-base font-bold text-stone-100 font-cinzel">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-stone-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">
              NEED HELP?
            </span>
            <h2 className="text-3xl font-black font-cinzel text-amber-200 mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <h4 className="text-sm font-bold text-amber-200 mb-2">Are Dandiya sticks included?</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                VIP, Couple, and Group passes include complimentary handcrafted wooden Dandiya sticks. Regular pass attendees can purchase sticks at ₹149 per pair during booking or at the venue.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <h4 className="text-sm font-bold text-amber-200 mb-2">What is the dress code?</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Traditional Indian festive attire is highly recommended! Women: Chaniya Choli, Lehenga, Kurti; Men: Kurta-Pajama, Dhoti, Kediya. Western formals/casuals are permitted, but ethnic wear is eligible for contest prizes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <h4 className="text-sm font-bold text-amber-200 mb-2">Is parking available at the venue?</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Yes! Palace Grounds Gate 4 has dedicated parking space for over 1,500 four-wheelers and 3,000 two-wheelers. Valet parking is available for VIP pass holders.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <h4 className="text-sm font-bold text-amber-200 mb-2">Is entry free for children?</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Children below 5 years enjoy complimentary entry accompanied by ticketed parents. Children aged 5 and above require an individual Regular pass.
              </p>
            </div>
          </div>

          {/* Bottom CTA banner */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold font-cinzel text-amber-200 mb-3">
              Ready to Join the Grandest Garba Circle?
            </h3>
            <p className="text-stone-300 text-sm mb-6">
              Passes are selling out fast! Grab your early bird passes before prices increase.
            </p>
            <button
              onClick={() => {
                playDandiyaClack();
                onBookNow();
              }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl text-stone-950 font-black bg-gradient-to-r from-amber-400 to-rose-500 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Book My Tickets Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
