import React, { useState } from 'react';
import { EVENT_DETAILS, TICKET_CATEGORIES, TicketCategoryId, BookingAddOns } from '../types';
import { CrossedDandiyaSticks, FestiveDiya } from './FestiveIcons';
import { playDandiyaClack } from '../utils/audio';
import { 
  Calendar, Clock, MapPin, Check, Plus, Minus, Tag, 
  ArrowRight, ShieldCheck, Sparkles, AlertCircle, Info, ChevronRight 
} from 'lucide-react';

export interface BookingFormData {
  customerName: string;
  email: string;
  phone: string;
  city: string;
  categoryId: TicketCategoryId;
  ticketCount: number;
  addOns: BookingAddOns;
  promoCode?: string;
  discount: number;
  subtotal: number;
  totalAmount: number;
}

interface BookingPageProps {
  initialCategoryId?: TicketCategoryId;
  onProceedToPayment: (data: BookingFormData) => void;
  onBackToHome: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialCategoryId = 'regular',
  onProceedToPayment,
  onBackToHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TicketCategoryId>(initialCategoryId);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('Hyderabad');
  const [addOns, setAddOns] = useState<BookingAddOns>({ dandiyaPairs: 0, foodCoupons: 0 });
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const currentCategory = TICKET_CATEGORIES.find(c => c.id === selectedCategory) || TICKET_CATEGORIES[0];
  const totalAttendees = ticketCount * currentCategory.entryCount;

  // Pricing calculations
  const baseTicketsTotal = currentCategory.price * ticketCount;
  const addOnsTotal = (addOns.dandiyaPairs * 149) + (addOns.foodCoupons * 200);
  const subtotal = baseTicketsTotal + addOnsTotal;
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const grandTotal = Math.max(0, subtotal - discount);

  // Promo code validation
  const handleApplyPromo = () => {
    playDandiyaClack();
    const clean = promoInput.trim().toUpperCase();
    setPromoError('');
    setPromoSuccess('');

    if (!clean) {
      setPromoError('Please enter a coupon code.');
      return;
    }

    if (clean === 'GARBA2026') {
      const disc = Math.min(100, subtotal);
      setAppliedPromo({ code: clean, discount: disc });
      setPromoSuccess('Festive code GARBA2026 applied! ₹100 discount saved.');
    } else if (clean === 'UTSAV2026') {
      const disc = Math.min(200, subtotal);
      setAppliedPromo({ code: clean, discount: disc });
      setPromoSuccess('Super UTSAV2026 code applied! ₹200 discount saved.');
    } else if (clean === 'DANDIYA50') {
      const disc = Math.min(50, subtotal);
      setAppliedPromo({ code: clean, discount: disc });
      setPromoSuccess('₹50 festive discount applied.');
    } else {
      setPromoError('Invalid promo code. Try GARBA2026 or UTSAV2026');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoSuccess('');
    setPromoError('');
  };

  // Form submission & validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playDandiyaClack();

    const errors: Record<string, string> = {};

    if (!customerName.trim()) {
      errors.customerName = 'Please enter full name.';
    } else if (customerName.trim().length < 3) {
      errors.customerName = 'Name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Please enter an email address.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (!phoneClean) {
      errors.phone = 'Please enter a mobile number.';
    } else if (phoneClean.length < 10) {
      errors.phone = 'Mobile number must be at least 10 digits.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const formData: BookingFormData = {
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phoneClean,
      city: city.trim() || 'Bengaluru',
      categoryId: selectedCategory,
      ticketCount,
      addOns,
      promoCode: appliedPromo?.code,
      discount,
      subtotal,
      totalAmount: grandTotal
    };

    onProceedToPayment(formData);
  };

  return (
    <div className="min-h-screen bg-mandala text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb / Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <span>Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
              <span>Ticket Booking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-cinzel text-amber-200 mt-1">
              Book Passes for Dandiya Night 2026
            </h1>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-stone-400 hover:text-amber-300 transition-colors"
          >
            ← Back to Event Details
          </button>
        </div>

        {/* 2-Column Main Layout: Form on Left, Sticky Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Booking Form Steps (Col 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Ticket Category */}
            <div className="p-6 rounded-3xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-lg font-bold font-cinzel text-amber-200">
                    Select Ticket Category
                  </h2>
                </div>
                <span className="text-xs text-stone-400">All prices in INR (₹)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {TICKET_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        playDandiyaClack();
                        setSelectedCategory(cat.id);
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                          : 'border-stone-800 bg-stone-950/50 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-sm text-stone-100 flex items-center gap-1.5">
                            {cat.name}
                            {cat.recommended && (
                              <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-stone-400 mt-0.5">{cat.tagline}</div>
                        </div>

                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-stone-600" />
                        )}
                      </div>

                      <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-stone-800">
                        <span className="text-lg font-black font-cinzel text-amber-300">
                          ₹{cat.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          Admits {cat.entryCount} {cat.entryCount === 1 ? 'Person' : 'Persons'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inclusions info of selected category */}
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>{currentCategory.name} Perks:</strong> {currentCategory.description}
                  {currentCategory.dandiyaIncluded && (
                    <span className="text-emerald-400 block mt-0.5">
                      ✓ Complimentary pairs of handcrafted Dandiya sticks included!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Number of Passes / Quantity Stepper */}
            <div className="p-6 rounded-3xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h2 className="text-lg font-bold font-cinzel text-amber-200">
                      Number of Passes
                    </h2>
                    <p className="text-xs text-stone-400">
                      Each pass admits {currentCategory.entryCount} person{currentCategory.entryCount > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Counter Stepper */}
                <div className="flex items-center gap-3 bg-stone-950 border border-stone-700 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => {
                      playDandiyaClack();
                      setTicketCount(Math.max(1, ticketCount - 1));
                    }}
                    disabled={ticketCount <= 1}
                    className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-30 text-amber-300 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="w-8 text-center text-lg font-black font-cinzel text-amber-200">
                    {ticketCount}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      playDandiyaClack();
                      setTicketCount(Math.min(10, ticketCount + 1));
                    }}
                    disabled={ticketCount >= 10}
                    className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-30 text-amber-300 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total attendee calculation pill */}
              <div className="mt-4 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800 pt-3">
                <span>Total attendees gaining entry:</span>
                <span className="font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                  {totalAttendees} {totalAttendees === 1 ? 'Person' : 'Persons'}
                </span>
              </div>
            </div>

            {/* Step 3: Attendee Details Form */}
            <div className="p-6 rounded-3xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <div>
                  <h2 className="text-lg font-bold font-cinzel text-amber-200">
                    Primary Attendee Details
                  </h2>
                  <p className="text-xs text-stone-400">
                    The digital QR ticket and gate pass will be issued in this name.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className={`w-full px-4 py-3 rounded-xl bg-stone-950 border text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                      formErrors.customerName ? 'border-rose-500' : 'border-stone-800'
                    }`}
                  />
                  {formErrors.customerName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.customerName}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-xs font-bold text-stone-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98450 12345"
                      maxLength={12}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl bg-stone-950 border text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                        formErrors.phone ? 'border-rose-500' : 'border-stone-800'
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aarav@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-stone-950 border text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                      formErrors.email ? 'border-rose-500' : 'border-stone-800'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.email}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Hyderabad"
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Optional Festive Add-ons */}
            <div className="p-6 rounded-3xl bg-stone-900/80 border border-amber-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs flex items-center justify-center border border-amber-500/40">
                  +
                </span>
                <div>
                  <h2 className="text-lg font-bold font-cinzel text-amber-200">
                    Festive Add-ons (Optional)
                  </h2>
                  <p className="text-xs text-stone-400">
                    Enhance your Dandiya night experience with exclusive gear and food vouchers.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Dandiya Sticks Pair Add-on */}
                <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CrossedDandiyaSticks size={28} />
                    <div>
                      <div className="text-sm font-bold text-stone-100">
                        Extra Handcrafted Wooden Dandiya Pair
                      </div>
                      <div className="text-xs text-stone-400">
                        ₹149 / pair · Gujarati lacquer craft with bells
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setAddOns(prev => ({ ...prev, dandiyaPairs: Math.max(0, prev.dandiyaPairs - 1) }))}
                      disabled={addOns.dandiyaPairs <= 0}
                      className="w-7 h-7 rounded-lg bg-stone-800 text-stone-300 disabled:opacity-30 flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold">{addOns.dandiyaPairs}</span>
                    <button
                      type="button"
                      onClick={() => setAddOns(prev => ({ ...prev, dandiyaPairs: prev.dandiyaPairs + 1 }))}
                      className="w-7 h-7 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Food & Beverage Coupon Add-on */}
                <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                      ₹
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-100">
                        Festive Food & Chaat Street Voucher
                      </div>
                      <div className="text-xs text-stone-400">
                        ₹200 / voucher · Valid across all 25+ food stalls
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setAddOns(prev => ({ ...prev, foodCoupons: Math.max(0, prev.foodCoupons - 1) }))}
                      disabled={addOns.foodCoupons <= 0}
                      className="w-7 h-7 rounded-lg bg-stone-800 text-stone-300 disabled:opacity-30 flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold">{addOns.foodCoupons}</span>
                    <button
                      type="button"
                      onClick={() => setAddOns(prev => ({ ...prev, foodCoupons: prev.foodCoupons + 1 }))}
                      className="w-7 h-7 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Summary (Col 5) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 rounded-3xl bg-stone-900/90 border-2 border-amber-500/40 shadow-2xl backdrop-blur-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest">
                    Order Summary
                  </span>
                  <h3 className="text-xl font-black font-cinzel text-amber-200">
                    Dandiya Night 2026
                  </h3>
                </div>
                <FestiveDiya size={26} />
              </div>

              {/* Event mini schedule badge */}
              <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800 mb-5 space-y-1.5 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{EVENT_DETAILS.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{EVENT_DETAILS.time} (Gates: {EVENT_DETAILS.gatesOpen})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{EVENT_DETAILS.venueName}</span>
                </div>
              </div>

              {/* Price Calculation Line items */}
              <div className="space-y-3 text-xs mb-6">
                <div className="flex items-center justify-between text-stone-300">
                  <div>
                    <span className="font-semibold text-stone-100">{currentCategory.name}</span>
                    <span className="text-stone-500 ml-1">× {ticketCount}</span>
                  </div>
                  <span className="font-mono font-bold text-stone-200">
                    ₹{baseTicketsTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {addOns.dandiyaPairs > 0 && (
                  <div className="flex items-center justify-between text-stone-300">
                    <div>
                      <span>Extra Dandiya Sticks</span>
                      <span className="text-stone-500 ml-1">× {addOns.dandiyaPairs}</span>
                    </div>
                    <span className="font-mono text-stone-200">
                      ₹{(addOns.dandiyaPairs * 149).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {addOns.foodCoupons > 0 && (
                  <div className="flex items-center justify-between text-stone-300">
                    <div>
                      <span>Food Vouchers</span>
                      <span className="text-stone-500 ml-1">× {addOns.foodCoupons}</span>
                    </div>
                    <span className="font-mono text-stone-200">
                      ₹{(addOns.foodCoupons * 200).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-stone-400 pt-2 border-t border-stone-800">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Coupon ({appliedPromo.code})
                    </span>
                    <span>- ₹{appliedPromo.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-stone-400">
                  <span>Festive GST & Handling</span>
                  <span className="text-emerald-400 font-medium">₹0 (Waived)</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="mb-6 pt-3 border-t border-stone-800">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                  Have a Promo Code?
                </label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
                    <span>Code <strong>{appliedPromo.code}</strong> applied</span>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-stone-400 hover:text-stone-200 text-xs underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="e.g. GARBA2026"
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-200 uppercase tracking-wider placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3.5 py-2 text-xs font-bold bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl border border-amber-500/30 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && <p className="text-[11px] text-rose-400 mt-1">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-400 mt-1">{promoSuccess}</p>}
                <div className="text-[10px] text-stone-500 mt-1">
                  Tip: Use <strong>GARBA2026</strong> for ₹100 off or <strong>UTSAV2026</strong> for ₹200 off
                </div>
              </div>

              {/* Total Payable Box */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/40 mb-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
                      Total Payable
                    </div>
                    <div className="text-[10px] text-emerald-400">
                      Includes {totalAttendees} attendee pass{totalAttendees > 1 ? 'es' : ''}
                    </div>
                  </div>
                  <div className="text-3xl font-black font-cinzel text-amber-300">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-stone-950 shadow-xl shadow-amber-500/25 hover:shadow-rose-500/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Payment
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Simulated Secure Checkout · Instant QR Pass</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
