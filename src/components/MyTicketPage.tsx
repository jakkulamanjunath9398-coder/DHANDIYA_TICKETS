import React, { useState } from 'react';
import { Booking } from '../types';
import { findBookingByIdOrPhone, getStoredBookings } from '../utils/storage';
import { PrintableTicket } from './PrintableTicket';
import { playDandiyaClack } from '../utils/audio';
import { CrossedDandiyaSticks, FestiveDiya } from './FestiveIcons';
import { Search, Ticket as TicketIcon, AlertCircle, Sparkles, CheckCircle2, User, Phone, Calendar } from 'lucide-react';

interface MyTicketPageProps {
  onBookNow: () => void;
}

export const MyTicketPage: React.FC<MyTicketPageProps> = ({ onBookNow }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Grab recent sample bookings from storage for quick 1-click test pills
  const storedBookings = getStoredBookings();
  const sampleBookings = storedBookings.slice(0, 3);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playDandiyaClack();

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSelectedBooking(null);
      setHasSearched(true);
      return;
    }

    const results = findBookingByIdOrPhone(searchQuery);
    setSearchResults(results);
    setHasSearched(true);

    if (results.length > 0) {
      setSelectedBooking(results[0]);
    } else {
      setSelectedBooking(null);
    }
  };

  const handleQuickSelect = (booking: Booking) => {
    playDandiyaClack();
    setSearchQuery(booking.id);
    setSearchResults([booking]);
    setSelectedBooking(booking);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-mandala text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Search Header Banner */}
        <div className="no-print text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-3">
            <FestiveDiya size={16} />
            <span>Digital E-Ticket Retrieval</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-cinzel text-amber-200">
            Find & Print My Ticket
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-2">
            Enter your <strong>Booking ID</strong> (e.g. DND26-784291) or registered <strong>Mobile Number</strong> to retrieve your official gate pass and scannable QR ticket.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="no-print p-6 rounded-3xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md shadow-xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Booking ID (DND26-XXXX) or 10-digit Mobile Number"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono"
              />
            </div>

            <button
              type="submit"
              className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-stone-950 font-black text-sm shadow-lg shadow-amber-500/20 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Search Ticket
            </button>
          </form>

          {/* Quick 1-click test pills */}
          <div className="mt-4 pt-4 border-t border-stone-800 flex flex-wrap items-center gap-2 text-xs text-stone-400">
            <span className="font-semibold text-stone-300">Quick Demo Search:</span>
            {sampleBookings.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleQuickSelect(b)}
                className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 text-amber-300 border border-stone-800 hover:border-amber-500/40 font-mono text-[11px] transition-colors cursor-pointer"
              >
                {b.id} ({b.customerName.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {selectedBooking ? (
          <div className="space-y-6">
            
            {/* If multiple tickets found under same phone, show selector tabs */}
            {searchResults.length > 1 && (
              <div className="no-print p-4 rounded-2xl bg-stone-900/60 border border-stone-800 flex items-center gap-2 overflow-x-auto">
                <span className="text-xs text-stone-400 font-semibold shrink-0">
                  Multiple Bookings Found ({searchResults.length}):
                </span>
                {searchResults.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => setSelectedBooking(res)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedBooking.id === res.id
                        ? 'bg-amber-500 text-stone-950 shadow'
                        : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    {res.id} · {res.categoryId.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {/* Render the printable ticket */}
            <PrintableTicket booking={selectedBooking} showActions={true} />
          </div>
        ) : hasSearched ? (
          /* Empty Search State */
          <div className="no-print p-10 rounded-3xl bg-stone-900/40 border border-stone-800 text-center max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-cinzel text-amber-200">
              No Bookings Found
            </h3>
            <p className="text-xs text-stone-400 mt-1 mb-6">
              We couldn't find any confirmed pass matching "{searchQuery}". Please check the Booking ID or mobile number and try again.
            </p>
            <button
              onClick={onBookNow}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs shadow-md hover:bg-amber-400 cursor-pointer"
            >
              Book New Passes Now
            </button>
          </div>
        ) : (
          /* Initial Helpful Instructions Card */
          <div className="no-print p-8 rounded-3xl bg-stone-900/40 border border-amber-500/20 text-center max-w-lg mx-auto">
            <TicketIcon className="w-10 h-10 text-amber-400/80 mx-auto mb-3" />
            <h3 className="text-base font-bold font-cinzel text-amber-200">
              Ready to Retrieve Your Pass?
            </h3>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Use the search bar above or click one of the sample Booking IDs to preview your printable pass with high-resolution entry QR code.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
