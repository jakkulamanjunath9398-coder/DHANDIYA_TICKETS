import React, { useState } from 'react';
import { Booking, TICKET_CATEGORIES } from '../types';
import { getStoredBookings, toggleCheckIn, resetBookingsToDefault } from '../utils/storage';
import { PrintableTicket } from './PrintableTicket';
import { playDandiyaClack } from '../utils/audio';
import { 
  Users, Ticket, IndianRupee, Crown, Search, CheckCircle2, 
  XCircle, Printer, Eye, RotateCcw, ShieldAlert, Sparkles, Filter 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => getStoredBookings());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedTicketForModal, setSelectedTicketForModal] = useState<Booking | null>(null);

  // Refresh bookings list
  const refreshBookings = () => {
    setBookings(getStoredBookings());
  };

  // Metrics calculation
  const totalBookings = bookings.length;
  const totalTicketsSold = bookings.reduce((sum, b) => sum + b.totalAttendees, 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  
  const regularCount = bookings
    .filter(b => b.categoryId === 'regular')
    .reduce((sum, b) => sum + b.totalAttendees, 0);
  const vipCount = bookings
    .filter(b => b.categoryId === 'vip')
    .reduce((sum, b) => sum + b.totalAttendees, 0);
  const coupleCount = bookings
    .filter(b => b.categoryId === 'couple')
    .reduce((sum, b) => sum + b.ticketCount, 0);
  const groupCount = bookings
    .filter(b => b.categoryId === 'group')
    .reduce((sum, b) => sum + b.ticketCount, 0);

  const checkedInCount = bookings.filter(b => b.checkedIn).length;

  // Check-in toggle handler
  const handleToggleCheckIn = (id: string) => {
    playDandiyaClack();
    const updated = toggleCheckIn(id);
    setBookings(updated);
    if (selectedTicketForModal && selectedTicketForModal.id === id) {
      setSelectedTicketForModal(updated.find(b => b.id === id) || null);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all bookings back to default demo state?')) {
      const reset = resetBookingsToDefault();
      setBookings(reset);
      setSelectedTicketForModal(null);
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || b.categoryId === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-mandala text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Event Operations & Gate Control</span>
            </div>
            <h1 className="text-3xl font-black font-cinzel text-amber-200 mt-1">
              Admin & Turnstile Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs font-semibold border border-stone-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>

        {/* Overview Stats Cards (4 Key Metrics) */}
        <div className="no-print grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Bookings */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Bookings</span>
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                <Ticket className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black font-cinzel text-amber-200">{totalBookings}</div>
            <div className="text-[11px] text-stone-400 mt-1">
              Confirmed digital transactions
            </div>
          </div>

          {/* Total Tickets / Attendees */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Attendees / Entries</span>
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black font-cinzel text-purple-200">{totalTicketsSold}</div>
            <div className="text-[11px] text-emerald-400 mt-1">
              {checkedInCount} checked in at gates
            </div>
          </div>

          {/* Total Revenue */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Revenue</span>
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black font-cinzel text-emerald-300">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">
              100% Real-time collected funds
            </div>
          </div>

          {/* VIP Passes */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">VIP Passes Sold</span>
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                <Crown className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black font-cinzel text-rose-300">{vipCount}</div>
            <div className="text-[11px] text-rose-400 mt-1">
              Priority Lounge Access
            </div>
          </div>

        </div>

        {/* Category Breakdown Bar */}
        <div className="no-print p-4 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-bold uppercase tracking-wider">Pass Distribution:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-stone-300">
            <span>Regular: <strong className="text-amber-300">{regularCount}</strong> seats</span>
            <span>·</span>
            <span>VIP: <strong className="text-rose-300">{vipCount}</strong> seats</span>
            <span>·</span>
            <span>Couple: <strong className="text-purple-300">{coupleCount}</strong> pairs ({coupleCount * 2} seats)</span>
            <span>·</span>
            <span>Group: <strong className="text-emerald-300">{groupCount}</strong> squads ({groupCount * 5} seats)</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="no-print p-4 rounded-2xl bg-stone-900/80 border border-amber-500/20 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Booking ID, Customer Name, Phone, or Email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-500 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="regular">Regular</option>
              <option value="vip">VIP</option>
              <option value="couple">Couple</option>
              <option value="group">Group</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="no-print rounded-3xl bg-stone-900/80 border border-amber-500/30 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
            <h3 className="font-bold text-sm font-cinzel text-amber-200">
              Recent Bookings ({filteredBookings.length})
            </h3>
            <span className="text-xs text-stone-500">Live in-memory & LocalStorage state</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-950/80 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800">
                <tr>
                  <th className="py-3.5 px-4">Booking ID</th>
                  <th className="py-3.5 px-4">Attendee</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Admit</th>
                  <th className="py-3.5 px-4">Total Paid</th>
                  <th className="py-3.5 px-4">Gate</th>
                  <th className="py-3.5 px-4">Gate Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80 text-stone-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-stone-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-300">
                        {b.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-100">{b.customerName}</div>
                        <div className="text-[11px] text-stone-400 font-mono">+91 {b.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-800 text-stone-300 border border-stone-700">
                          {b.categoryId}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">
                        {b.totalAttendees} Person{b.totalAttendees > 1 ? 's' : ''}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-amber-200">
                        ₹{b.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-stone-300 text-[11px]">
                        {b.gateNumber.split('-')[0].trim()}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleCheckIn(b.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            b.checkedIn
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                          }`}
                        >
                          {b.checkedIn ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Checked In</span>
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                              <span>Pending Entry</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              playDandiyaClack();
                              setSelectedTicketForModal(b);
                            }}
                            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 cursor-pointer"
                            title="View & Print Ticket"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              playDandiyaClack();
                              setSelectedTicketForModal(b);
                            }}
                            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-stone-500 text-xs">
                      No matching bookings found for "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for viewing and printing individual ticket */}
        {selectedTicketForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#130720] p-6 rounded-3xl border-2 border-amber-500/40 shadow-2xl">
              
              <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                    Admin Pass Inspector · {selectedTicketForModal.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTicketForModal(null)}
                  className="px-3 py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Render printable ticket inside modal */}
              <PrintableTicket 
                booking={selectedTicketForModal} 
                showActions={true}
                onClose={() => setSelectedTicketForModal(null)}
              />

              {/* Gate Entry Check-in Quick Control */}
              <div className="no-print mt-4 p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                <div className="text-xs text-stone-300">
                  Current Gate Status: <strong>{selectedTicketForModal.checkedIn ? 'Checked In' : 'Not Checked In'}</strong>
                </div>
                <button
                  onClick={() => handleToggleCheckIn(selectedTicketForModal.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    selectedTicketForModal.checkedIn
                      ? 'bg-rose-900 text-rose-200 hover:bg-rose-800'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                >
                  {selectedTicketForModal.checkedIn ? 'Revoke Check-in' : 'Mark Checked In & Admit Guest'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
