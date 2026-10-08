/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { BookingPage, BookingFormData } from './components/BookingPage';
import { PaymentPage } from './components/PaymentPage';
import { BookingConfirmationPage } from './components/BookingConfirmationPage';
import { MyTicketPage } from './components/MyTicketPage';
import { AdminDashboard } from './components/AdminDashboard';
import { EventHighlightsPage } from './components/EventHighlightsPage';
import { Footer } from './components/Footer';
import { TicketCategoryId, Booking } from './types';

type AppTab = 'home' | 'highlights' | 'book' | 'payment' | 'confirmation' | 'my-ticket' | 'admin';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedInitialCategory, setSelectedInitialCategory] = useState<TicketCategoryId>('regular');
  const [currentBookingDraft, setCurrentBookingDraft] = useState<BookingFormData | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Transition handlers
  const handleStartBooking = (category?: TicketCategoryId) => {
    if (category) {
      setSelectedInitialCategory(category);
    }
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToPayment = (formData: BookingFormData) => {
    setCurrentBookingDraft(formData);
    setActiveTab('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = (booking: Booking) => {
    setConfirmedBooking(booking);
    setActiveTab('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBooking = () => {
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0614] text-stone-100 selection:bg-amber-500 selection:text-stone-950">
      
      {/* Global Navigation Header (hidden during print) */}
      <Navbar 
        currentTab={activeTab} 
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage 
            onBookNow={handleStartBooking}
            onViewMyTicket={() => {
              setActiveTab('my-ticket');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreHighlights={() => {
              setActiveTab('highlights');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'highlights' && (
          <EventHighlightsPage 
            onBookNow={handleStartBooking}
          />
        )}

        {activeTab === 'book' && (
          <BookingPage 
            initialCategoryId={selectedInitialCategory}
            onProceedToPayment={handleProceedToPayment}
            onBackToHome={handleGoHome}
          />
        )}

        {activeTab === 'payment' && currentBookingDraft && (
          <PaymentPage 
            bookingData={currentBookingDraft}
            onPaymentSuccess={handlePaymentSuccess}
            onBackToBooking={handleBackToBooking}
          />
        )}

        {activeTab === 'confirmation' && confirmedBooking && (
          <BookingConfirmationPage 
            booking={confirmedBooking}
            onGoHome={handleGoHome}
            onBookAnother={() => handleStartBooking('regular')}
            onFindTicket={() => {
              setActiveTab('my-ticket');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'my-ticket' && (
          <MyTicketPage 
            onBookNow={() => handleStartBooking('regular')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Footer (hidden during print) */}
      <Footer 
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />

    </div>
  );
}
