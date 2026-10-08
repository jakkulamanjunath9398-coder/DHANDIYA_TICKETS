import React, { useEffect, useState, useRef } from 'react';
import { Booking, EVENT_DETAILS, TICKET_CATEGORIES } from '../types';
import { generateTicketQRCode, downloadTicketPDF, triggerPrintTicket } from '../utils/ticketGenerator';
import { CrossedDandiyaSticks, FestiveDiya } from './FestiveIcons';
import { Printer, Download, Share2, CheckCircle2, ShieldCheck, Calendar, Clock, MapPin, Sparkles, User, Ticket as TicketIcon } from 'lucide-react';

interface PrintableTicketProps {
  booking: Booking;
  onClose?: () => void;
  showActions?: boolean;
}

export const PrintableTicket: React.FC<PrintableTicketProps> = ({ 
  booking, 
  onClose,
  showActions = true 
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const category = TICKET_CATEGORIES.find(c => c.id === booking.categoryId) || TICKET_CATEGORIES[0];

  useEffect(() => {
    // Generate QR Code containing booking verification data
    const verificationData = JSON.stringify({
      id: booking.id,
      name: booking.customerName,
      cat: booking.categoryId,
      count: booking.ticketCount,
      att: booking.totalAttendees,
      event: 'Dandiya Night 2026',
      txn: booking.transactionId,
      status: booking.paymentStatus,
      checkToken: `SEC-${booking.id}-${booking.phone.slice(-4)}`
    });

    generateTicketQRCode(verificationData).then(url => {
      setQrCodeDataUrl(url);
    });
  }, [booking]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await downloadTicketPDF('dandiya-printable-ticket-card', `${booking.id}_Dandiya_Ticket_2026.pdf`);
    setIsDownloading(false);
  };

  const handlePrint = () => {
    triggerPrintTicket();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎉 I'm attending Dandiya Night 2026!\n🎟️ Booking ID: ${booking.id}\n📍 Venue: ${EVENT_DETAILS.venueName}\n📅 Date: ${EVENT_DETAILS.date}\nSee you at the Garba circle!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Top action toolbar (Hidden when printing via CSS) */}
      {showActions && (
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 bg-amber-950/40 backdrop-blur-md p-4 rounded-2xl border border-amber-500/30">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-medium text-amber-200">
              Verified Digital E-Ticket & Gate Pass
            </span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Ticket
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-200 font-medium text-sm rounded-xl border border-amber-500/30 transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 text-sm font-medium rounded-xl border border-emerald-500/40 cursor-pointer"
              title="Share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2 bg-stone-900 text-stone-400 hover:text-stone-200 text-sm rounded-xl border border-stone-800"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* 
        THE PRINT ROOT:
        In @media print, .print-ticket-root is made visible and full width,
        ensuring an elegant, high contrast, crisp print output.
      */}
      <div className="print-ticket-root">
        <div 
          id="dandiya-printable-ticket-card"
          ref={ticketRef}
          className="ticket-card-print relative bg-gradient-to-br from-[#1c0d28] via-[#160822] to-[#250d18] text-white rounded-3xl border-2 border-amber-500/60 shadow-2xl overflow-hidden print:bg-white print:text-black print:rounded-none"
        >
          {/* Subtle top decorative ribbon */}
          <div className="h-2.5 w-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500" />

          {/* Main Ticket Layout: Two sections separated by a dashed perforated tear line */}
          <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 relative">
            
            {/* Left Section: Event & Attendee Details (Col 8) */}
            <div className="md:col-span-8 print:col-span-8 p-6 sm:p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-dashed border-amber-500/40">
              
              {/* Header banner */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CrossedDandiyaSticks size={32} />
                    <div>
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400 print:text-amber-800">
                        Official Gate Pass · Navratri 2026
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-cinzel text-amber-200 print:text-stone-900">
                        DANDIYA NIGHT 2026
                      </h2>
                    </div>
                  </div>
                  
                  {/* Category Stamp */}
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/50 print:bg-stone-100 print:text-stone-900 print:border-stone-800">
                      {category.name}
                    </span>
                    <div className="text-[11px] text-stone-400 print:text-stone-600 mt-1 font-mono">
                      {booking.id}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-rose-300/90 print:text-rose-800 italic mb-6">
                  {EVENT_DETAILS.subTitle} · Non-Stop Garba, Live DJ & Food Carnival
                </p>

                {/* Key Event Details Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-amber-500/20 print:border-stone-300 mb-6 bg-stone-950/30 print:bg-stone-50 p-4 rounded-2xl">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-400 print:text-stone-700 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-stone-400 print:text-stone-600 tracking-wider">
                        Date
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-stone-100 print:text-stone-900">
                        {EVENT_DETAILS.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 print:text-stone-700 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-stone-400 print:text-stone-600 tracking-wider">
                        Timing
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-stone-100 print:text-stone-900">
                        {EVENT_DETAILS.time}
                      </div>
                      <div className="text-[10px] text-amber-300 print:text-amber-700">
                        Gates Open {EVENT_DETAILS.gatesOpen}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-start gap-2.5 pt-2">
                    <MapPin className="w-4 h-4 text-amber-400 print:text-stone-700 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-stone-400 print:text-stone-600 tracking-wider">
                        Venue & Entry Gate
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-stone-100 print:text-stone-900">
                        {EVENT_DETAILS.venueName}
                      </div>
                      <div className="text-[11px] text-stone-400 print:text-stone-600">
                        {EVENT_DETAILS.venueAddress}, {EVENT_DETAILS.city}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attendee & Pass Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-stone-900/50 print:bg-stone-100 border border-stone-800 print:border-stone-300">
                    <div className="text-[10px] text-stone-400 print:text-stone-600 uppercase font-semibold">Attendee Name</div>
                    <div className="text-xs font-bold text-amber-100 print:text-stone-900 truncate">{booking.customerName}</div>
                    <div className="text-[10px] text-stone-500 font-mono">{booking.phone}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-900/50 print:bg-stone-100 border border-stone-800 print:border-stone-300">
                    <div className="text-[10px] text-stone-400 print:text-stone-600 uppercase font-semibold">Admit Count</div>
                    <div className="text-xs font-bold text-amber-300 print:text-stone-900">
                      {booking.totalAttendees} {booking.totalAttendees === 1 ? 'Person' : 'Persons'}
                    </div>
                    <div className="text-[10px] text-stone-400">({booking.ticketCount} {category.name})</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-900/50 print:bg-stone-100 border border-stone-800 print:border-stone-300">
                    <div className="text-[10px] text-stone-400 print:text-stone-600 uppercase font-semibold">Gate Access</div>
                    <div className="text-xs font-bold text-emerald-400 print:text-emerald-800">
                      {booking.gateNumber}
                    </div>
                    <div className="text-[10px] text-stone-400">Turnstile #04</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-900/50 print:bg-stone-100 border border-stone-800 print:border-stone-300">
                    <div className="text-[10px] text-stone-400 print:text-stone-600 uppercase font-semibold">Amount Paid</div>
                    <div className="text-xs font-bold text-amber-200 print:text-stone-900">
                      ₹{booking.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-emerald-400 uppercase font-bold">PAID IN FULL</div>
                  </div>
                </div>

                {/* Inclusions note */}
                <div className="p-2.5 rounded-xl bg-amber-500/10 print:bg-amber-50 border border-amber-500/30 print:border-amber-200 text-xs text-amber-200/90 print:text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    <strong>Pass Inclusions:</strong> {category.tagline}. {booking.addOns.dandiyaPairs > 0 && `+ ${booking.addOns.dandiyaPairs} Extra Dandiya Pair(s)`} {booking.addOns.foodCoupons > 0 && `+ ${booking.addOns.foodCoupons} Food Voucher(s)`}
                  </span>
                </div>
              </div>

              {/* Bottom security watermark and disclaimer */}
              <div className="mt-6 pt-3 border-t border-stone-800 print:border-stone-300 flex items-center justify-between text-[10px] text-stone-400 print:text-stone-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 print:text-stone-700" />
                  <span>Secure Holographic Gate Token: <strong>{booking.transactionId}</strong></span>
                </div>
                <div>Dress Code: Traditional Garba Attire</div>
              </div>
            </div>

            {/* Right Section: Tear-off Stub / Gate Scanner QR code (Col 4) */}
            <div className="md:col-span-4 print:col-span-4 p-6 flex flex-col items-center justify-between bg-stone-950/60 print:bg-white relative">
              
              {/* Decorative notches for tear-off effect (hidden on mobile, visible on desktop) */}
              <div className="hidden md:block absolute -left-3 top-10 w-6 h-6 rounded-full bg-[#0d0614] print:hidden" />
              <div className="hidden md:block absolute -left-3 bottom-10 w-6 h-6 rounded-full bg-[#0d0614] print:hidden" />
              <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0d0614] print:hidden" />

              <div className="w-full text-center">
                <div className="text-[10px] tracking-widest uppercase font-bold text-amber-400 print:text-amber-800 mb-1">
                  ENTRY ADMIT STUB
                </div>
                <div className="text-xs font-mono font-bold text-stone-200 print:text-stone-800">
                  {booking.id}
                </div>
                <div className="text-[11px] text-stone-400 print:text-stone-600 mb-3">
                  Scan at Entrance Turnstile
                </div>

                {/* QR Code Canvas/Image */}
                <div className="p-3 bg-white rounded-2xl shadow-inner inline-block mx-auto border-2 border-amber-400/50 print:border-stone-800">
                  {qrCodeDataUrl ? (
                    <img 
                      src={qrCodeDataUrl} 
                      alt="Gate Verification QR Code" 
                      className="w-36 h-36 object-contain"
                    />
                  ) : (
                    <div className="w-36 h-36 flex items-center justify-center bg-stone-100 text-stone-400 text-xs font-mono">
                      Generating QR...
                    </div>
                  )}
                </div>

                {/* Check-in status pill */}
                <div className="mt-3">
                  {booking.checkedIn ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-[11px] font-bold">
                      <CheckCircle2 className="w-3 h-3" /> Checked In
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-[11px] font-bold">
                      <TicketIcon className="w-3 h-3" /> Valid for Entry
                    </span>
                  )}
                </div>
              </div>

              {/* Barcode & Security Strip */}
              <div className="w-full mt-4 pt-3 border-t border-dashed border-stone-800 print:border-stone-300 text-center">
                {/* Mock barcode lines */}
                <div className="h-8 flex items-center justify-center gap-0.5 px-4 mb-1">
                  {[...Array(34)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-full bg-stone-300 print:bg-black" 
                      style={{ 
                        width: (i % 3 === 0 ? '3px' : i % 5 === 0 ? '1px' : '2px'),
                        opacity: i % 7 === 0 ? 0.3 : 1 
                      }}
                    />
                  ))}
                </div>
                <div className="text-[9px] font-mono tracking-widest text-stone-400 print:text-stone-600">
                  TXN: {booking.transactionId.slice(0, 16)}
                </div>
              </div>
            </div>

          </div>

          {/* Ticket Footer: Terms & Conditions */}
          <div className="bg-stone-950/80 print:bg-stone-100 px-6 py-3 border-t border-amber-500/30 text-[10px] text-stone-400 print:text-stone-700 leading-relaxed">
            <strong>Important Terms:</strong> 1. Carry a valid government ID matching the attendee name. 2. Wristbands will be issued upon scanning; tamper-evident bands must be worn throughout. 3. Re-entry allowed only with intact wristband. 4. Traditional Indian festive dress code strongly recommended. 5. Strictly alcohol, smoke & drug-free cultural event. 6. Organizers reserve the right to admission.
          </div>
        </div>
      </div>
    </div>
  );
};
