import React, { useState } from 'react';
import { BookingFormData } from './BookingPage';
import { Booking, EVENT_DETAILS, TICKET_CATEGORIES } from '../types';
import { generateBookingId, saveBooking } from '../utils/storage';
import { playDandiyaClack, playSuccessChime } from '../utils/audio';
import { CrossedDandiyaSticks, FestiveDiya } from './FestiveIcons';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, Lock, CreditCard, Smartphone, Building, 
  Banknote, ArrowLeft, CheckCircle2, Loader2, Sparkles, AlertCircle 
} from 'lucide-react';

interface PaymentPageProps {
  bookingData: BookingFormData;
  onPaymentSuccess: (confirmedBooking: Booking) => void;
  onBackToBooking: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  bookingData,
  onPaymentSuccess,
  onBackToBooking
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cash'>('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardHolder, setCardHolder] = useState(bookingData.customerName);
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('382');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const category = TICKET_CATEGORIES.find(c => c.id === bookingData.categoryId) || TICKET_CATEGORIES[0];
  const pendingBookingId = React.useMemo(() => generateBookingId(), []);

  const handlePayNow = () => {
    playDandiyaClack();
    setIsProcessing(true);
    setProcessingStep('Connecting to secure payment gateway...');

    setTimeout(() => {
      setProcessingStep('Authorizing payment with bank server...');
    }, 700);

    setTimeout(() => {
      setProcessingStep('Generating encrypted Gate QR pass...');
    }, 1400);

    setTimeout(() => {
      setIsProcessing(false);
      playSuccessChime();

      // Launch festive celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ec4899', '#10b981', '#fbbf24', '#a855f7']
      });

      // Assemble confirmed booking object
      const confirmedBooking: Booking = {
        id: pendingBookingId,
        customerName: bookingData.customerName,
        email: bookingData.email,
        phone: bookingData.phone,
        categoryId: bookingData.categoryId,
        ticketCount: bookingData.ticketCount,
        totalAttendees: bookingData.ticketCount * category.entryCount,
        categoryPrice: category.price,
        addOns: bookingData.addOns,
        subtotal: bookingData.subtotal,
        discount: bookingData.discount,
        promoCode: bookingData.promoCode,
        totalAmount: bookingData.totalAmount,
        paymentMethod: paymentMethod,
        paymentStatus: 'CONFIRMED',
        transactionId: `TXN-${paymentMethod.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`,
        createdAt: new Date().toISOString(),
        checkedIn: false,
        gateNumber: category.id === 'vip' ? 'Gate A - VIP Pavilion' : category.id === 'group' ? 'Gate A - Group Pavilion' : 'Gate B - Royal Arch'
      };

      // Save to LocalStorage
      saveBooking(confirmedBooking);

      // Callback to show confirmation page
      onPaymentSuccess(confirmedBooking);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-mandala text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Back bar */}
        <div className="mb-6 flex items-center justify-between border-b border-amber-500/20 pb-4">
          <button
            onClick={onBackToBooking}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-amber-300 transition-colors disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" />
            Modify Booking Details
          </button>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit SSL Encrypted Sandbox</span>
          </div>
        </div>

        {/* Main Payment Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Payment Methods (Col 7) */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Payment Gateway
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-200">
                  Select Payment Method
                </h2>
              </div>
              <FestiveDiya size={26} />
            </div>

            {/* Payment Tabs: UPI, Card, Net Banking, Cash */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-1.5 bg-stone-950 rounded-2xl border border-stone-800">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  paymentMethod === 'netbanking'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span>Cash Counter</span>
              </button>
            </div>

            {/* TAB CONTENT: 1. UPI */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { id: 'gpay', name: 'Google Pay' },
                    { id: 'phonepe', name: 'PhonePe' },
                    { id: 'paytm', name: 'Paytm' },
                    { id: 'bhim', name: 'BHIM UPI' }
                  ].map(app => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setSelectedUpiApp(app.id as any)}
                      className={`p-2.5 rounded-xl border text-[11px] font-bold text-center cursor-pointer transition-all ${
                        selectedUpiApp === app.id
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                          : 'border-stone-800 bg-stone-950 text-stone-400'
                      }`}
                    >
                      {app.name}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    Enter UPI ID (VPA)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    A payment request will be simulated on your UPI app.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. Card */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 0000 0000 8912"
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="08/29"
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. Net Banking */}
            {paymentMethod === 'netbanking' && (
              <div className="space-y-4 animate-fadeIn">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Select Popular Bank
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank'].map(bank => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
                        selectedBank === bank
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                          : 'border-stone-800 bg-stone-950 text-stone-400'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 4. Cash Desk */}
            {paymentMethod === 'cash' && (
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 space-y-2 animate-fadeIn">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-amber-400" />
                  Pay at Palace Grounds Gate Cash Desk
                </div>
                <p>
                  Your Booking ID will be generated right now. You can show the digital pass at the dedicated Spot Collection Counter at Gate 4 and pay cash/UPI before entering the dance arena.
                </p>
              </div>
            )}

            {/* Pay Now Action button */}
            <div className="mt-8 pt-6 border-t border-stone-800">
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-stone-950 shadow-xl shadow-amber-500/25 hover:shadow-rose-500/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-stone-950" />
                    <span>Processing Demo Payment...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-stone-950" />
                    <span>Pay ₹{bookingData.totalAmount.toLocaleString('en-IN')} & Confirm</span>
                  </>
                )}
              </button>

              {isProcessing && (
                <div className="mt-3 text-center text-xs text-amber-300 font-mono animate-pulse">
                  {processingStep}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Booking Order Overview (Col 5) */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-stone-900/90 border-2 border-amber-500/30 backdrop-blur-md">
            
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Booking Receipt
                </span>
                <h3 className="text-lg font-black font-cinzel text-amber-200">
                  {pendingBookingId}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Pending Payment
              </span>
            </div>

            {/* Overview details */}
            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Customer Name</span>
                <span className="font-bold text-stone-100">{bookingData.customerName}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Mobile Number</span>
                <span className="font-mono text-stone-200">+91 {bookingData.phone}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Selected Pass Type</span>
                <span className="font-bold text-amber-300">{category.name}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Pass Quantity</span>
                <span className="font-bold text-stone-100">
                  {bookingData.ticketCount} {bookingData.ticketCount === 1 ? 'Pass' : 'Passes'}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Total Attendees</span>
                <span className="font-bold text-emerald-400">
                  {bookingData.ticketCount * category.entryCount} Persons
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Event Date</span>
                <span className="text-stone-200">{EVENT_DETAILS.date}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Venue</span>
                <span className="text-stone-200 truncate max-w-[180px]">{EVENT_DETAILS.venueName}</span>
              </div>
            </div>

            {/* Total Payable Box */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/40">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">Amount Due</div>
                  <div className="text-[10px] text-emerald-400">Inclusive of all taxes</div>
                </div>
                <div className="text-3xl font-black font-cinzel text-amber-300">
                  ₹{bookingData.totalAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-stone-950/60 border border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Clicking Pay Now simulates an instantaneous successful payment and unlocks your official printable QR ticket.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
