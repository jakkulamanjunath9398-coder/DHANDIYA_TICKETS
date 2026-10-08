import React, { useEffect } from 'react';
import { Booking, EVENT_DETAILS, TICKET_CATEGORIES } from '../types';
import { PrintableTicket } from './PrintableTicket';
import { playDandiyaClack } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, Sparkles, ArrowRight, Home, Calendar, 
  MapPin, Clock, Ticket as TicketIcon, Search, Printer, Download 
} from 'lucide-react';

interface BookingConfirmationPageProps {
  booking: Booking;
  onGoHome: () => void;
  onBookAnother: () => void;
  onFindTicket: () => void;
}

export const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({
  booking,
  onGoHome,
  onBookAnother,
  onFindTicket
}) => {
  const category = TICKET_CATEGORIES.find(c => c.id === booking.categoryId) || TICKET_CATEGORIES[0];

  useEffect(() => {
    // Fire festive celebration fireworks confetti
    const end = Date.now() + 1500;
    const colors = ['#f59e0b', '#ec4899', '#10b981', '#fbbf24', '#a855f7'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="min-h-screen bg-mandala text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Celebration Banner Card */}
        <div className="no-print p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/70 via-stone-900/90 to-amber-950/70 border-2 border-emerald-500/40 text-center shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-emerald-500/20 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-300 to-amber-200">
            🎉 Booking Confirmed!
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-lg mx-auto mt-2">
            Namaste <strong>{booking.customerName}</strong>! Your passes for Dandiya Night 2026 have been booked and verified successfully.
          </p>

          {/* Quick Summary Grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-2xl mx-auto">
            <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Booking ID</span>
              <div className="text-xs sm:text-sm font-bold font-mono text-amber-300">{booking.id}</div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Category</span>
              <div className="text-xs sm:text-sm font-bold text-stone-100">{category.name}</div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Total Entry</span>
              <div className="text-xs sm:text-sm font-bold text-emerald-400">{booking.totalAttendees} Persons</div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-bold">Paid</span>
              <div className="text-xs sm:text-sm font-bold text-amber-300">₹{booking.totalAmount.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Quick instructions */}
          <div className="mt-5 text-xs text-stone-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Please print or save the QR ticket pass below for quick turnstile clearance at the venue.</span>
          </div>
        </div>

        {/* The Printable Ticket Card Component with QR, Print, and PDF actions */}
        <div>
          <PrintableTicket booking={booking} showActions={true} />
        </div>

        {/* Bottom Helpful Navigation Links (Hidden on print) */}
        <div className="no-print pt-6 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              playDandiyaClack();
              onGoHome();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-200 text-xs font-semibold border border-stone-800 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playDandiyaClack();
                onFindTicket();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-semibold border border-amber-500/30 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              View in My Tickets
            </button>

            <button
              onClick={() => {
                playDandiyaClack();
                onBookAnother();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow-md cursor-pointer"
            >
              <TicketIcon className="w-4 h-4" />
              Book Another Pass
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
