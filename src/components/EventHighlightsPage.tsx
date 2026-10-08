import React from 'react';
import { EVENT_DETAILS, TICKET_CATEGORIES } from '../types';
import { CrossedDandiyaSticks, FestiveDiya } from './FestiveIcons';
import { playDandiyaClack } from '../utils/audio';
import { 
  Music, UtensilsCrossed, Trophy, Camera, Users, Sparkles, 
  MapPin, Clock, Calendar, CheckCircle2, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface EventHighlightsPageProps {
  onBookNow: () => void;
}

export const EventHighlightsPage: React.FC<EventHighlightsPageProps> = ({ onBookNow }) => {
  return (
    <div className="min-h-screen bg-mandala text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-3">
            <FestiveDiya size={16} />
            <span>Grand Navratri Celebrations 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black font-cinzel text-amber-200">
            Dandiya Night 2026 Highlights
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
            Immerse yourself in the magic of Navratri. Discover everything waiting for you at the largest Dandiya and Garba extravaganza in Bengaluru.
          </p>
        </div>

        {/* Feature 1: Celebrity DJ & Folk Artists */}
        <div className="p-8 rounded-3xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Music className="w-4 h-4" />
              <span>Artist Line-up & Musical Beats</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-amber-200 mb-3">
              DJ Akhil & The Folk Fusion Troupe
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed mb-4">
              Get ready for non-stop electrifying rhythms! From soulful traditional Gujarati Sanedo, Dodhiyu, and Tran Taali circles to high-energy Bollywood remixes of Chogada Tara, Kamariya, and Dholida.
            </p>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live authentic Puneri & Nasik Dhol percussionists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>State-of-the-art concert Line-Array audio sound systems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Surreal laser light show and cold pyro sparkle fountains</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 text-center">
            <CrossedDandiyaSticks size={80} className="mx-auto mb-4" />
            <h3 className="text-lg font-bold font-cinzel text-amber-300">
              5 Hours Non-Stop Music
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Dance your heart out from 6:30 PM till midnight without interruption!
            </p>
          </div>
        </div>

        {/* Feature 2: Food Street & Chaat Bazaar */}
        <div className="p-8 rounded-3xl bg-stone-900/80 border border-emerald-500/30 backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 p-6 rounded-2xl bg-stone-950 border border-stone-800">
            <h3 className="text-lg font-bold font-cinzel text-emerald-300 mb-3 text-center">
              Curated Festive Delicacies
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-stone-300">
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                <strong className="text-amber-300 block">Jalebi & Fafda</strong>
                <span className="text-[11px] text-stone-400">Crispy besan snack with papaya sambharo</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                <strong className="text-amber-300 block">Kutchi Dabeli</strong>
                <span className="text-[11px] text-stone-400">Spiced potato, pomegranate & peanuts</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                <strong className="text-amber-300 block">Mumbai Pav Bhaji</strong>
                <span className="text-[11px] text-stone-400">Rich buttery bhaji with toasted pav</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                <strong className="text-amber-300 block">Kesar Dry Fruit Kulfi</strong>
                <span className="text-[11px] text-stone-400">Chilled traditional rabri sticks</span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Gastronomic Delights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-emerald-200 mb-3">
              Royal Food Street & Chaat Bazaar
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed mb-4">
              Refuel between dance rounds with over 25 culinary live food stalls. 100% pure vegetarian with dedicated Jain preparation counters and hygienic seating zones.
            </p>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Special Navratri Fasting (Vrat) thali counters available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thirst-quenching Gulab Sharbat, Masala Chaas & Fresh Juices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Garba Competitions & Prizes */}
        <div className="p-8 rounded-3xl bg-stone-900/80 border border-rose-500/30 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4" />
              <span>Contests & Accolades</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-rose-200 mb-2">
              Dandiya Night 2026 Grand Contests
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm">
              Dress in your most glamorous traditional ethnic wear and show off your finest choreography steps to win mega trophies and prizes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Best Garba King & Queen', prize: '₹15,000 + Golden Trophy', criteria: 'Judged on rhythm, energy, and continuous dancing style' },
              { title: 'Best Dressed Traditional', prize: '₹10,000 + Designer Hamper', criteria: 'Authentic Chaniya Choli, Kediya, jewelry, and ethnic swag' },
              { title: 'Best Dandiya Duo / Couple', prize: '₹12,000 + Luxury Stay Voucher', criteria: 'Synchronized stick work and harmonious coordination' },
              { title: 'Kids Garba Rockstars', prize: '₹5,000 + Gift Hampers', criteria: 'For young dancers aged 5–14 bringing festive joy' }
            ].map((contest, i) => (
              <div key={i} className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 text-center">
                <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-stone-100 font-cinzel">{contest.title}</h4>
                <div className="text-xs font-bold text-rose-300 my-1">{contest.prize}</div>
                <p className="text-[11px] text-stone-400 mt-1">{contest.criteria}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Location & Amenities */}
        <div className="p-8 rounded-3xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>Venue & Facility Highlights</span>
              </div>
              <h2 className="text-2xl font-bold font-cinzel text-amber-200">
                {EVENT_DETAILS.venueName}
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                {EVENT_DETAILS.venueAddress}, {EVENT_DETAILS.city}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-300">
                <span className="px-3 py-1 bg-stone-950 rounded-xl border border-stone-800">✓ 1500+ Car Parking</span>
                <span className="px-3 py-1 bg-stone-950 rounded-xl border border-stone-800">✓ On-site Ambulance & First Aid</span>
                <span className="px-3 py-1 bg-stone-950 rounded-xl border border-stone-800">✓ 100+ Security Personnel & CCTV</span>
                <span className="px-3 py-1 bg-stone-950 rounded-xl border border-stone-800">✓ Sanitized Luxury Restrooms</span>
              </div>
            </div>

            <button
              onClick={() => {
                playDandiyaClack();
                onBookNow();
              }}
              className="px-8 py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 to-rose-500 text-stone-950 shadow-xl hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              Book My Entry Pass
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
