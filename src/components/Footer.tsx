import React from 'react';
import { EVENT_DETAILS } from '../types';
import { CrossedDandiyaSticks, FestiveDiya } from './FestiveIcons';
import { MapPin, Phone, Mail, Calendar, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'book' | 'my-ticket' | 'admin' | 'highlights') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="no-print bg-[#09030e] border-t border-amber-500/20 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Theme */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <CrossedDandiyaSticks size={28} />
              <span className="font-black font-cinzel text-lg text-amber-200">
                DANDIYA NIGHT <span className="text-rose-400">2026</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Official ticketing portal for Hyderabad's largest Navratri Raas Garba Mahotsav. Certified entry passes with digital QR verification.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-300">
              <FestiveDiya size={16} />
              <span>Celebrating 9 Nights of Shakti & Joy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onSelectTab('home')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home & Event Schedule
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('book')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Book Tickets & Passes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('my-ticket')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Retrieve Ticket via QR Search
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('highlights')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Food Street & Contest Details
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('admin')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Admin & Gate Turnstile Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Event Venue & Dates */}
          <div>
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Event Location
            </h4>
            <div className="space-y-2 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{EVENT_DETAILS.venueName}, {EVENT_DETAILS.venueAddress}, {EVENT_DETAILS.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{EVENT_DETAILS.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{EVENT_DETAILS.time}</span>
              </div>
            </div>
          </div>

          {/* Support & Helpline */}
          <div>
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Organizer Support
            </h4>
            <div className="space-y-2 leading-relaxed">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{EVENT_DETAILS.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{EVENT_DETAILS.contactEmail}</span>
              </div>
              <div className="mt-3 p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline mr-1" />
                Organized under cultural auspices of {EVENT_DETAILS.organizer}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div>
            © 2026 Dandiya Night Organizers. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with festive devotion</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Navratri Garba Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
