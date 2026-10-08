export type TicketCategoryId = 'regular' | 'vip' | 'couple' | 'group';

export interface TicketCategory {
  id: TicketCategoryId;
  name: string;
  tagline: string;
  price: number;
  entryCount: number; // e.g. Couple = 2 people, Group = 5 people
  description: string;
  perks: string[];
  recommended?: boolean;
  dandiyaIncluded: boolean;
  color: {
    bg: string;
    border: string;
    badge: string;
    text: string;
  };
}

export interface BookingAddOns {
  dandiyaPairs: number; // ₹149 per extra decorative pair
  foodCoupons: number;  // ₹200 festive chaat & thali coupon
}

export interface Booking {
  id: string; // e.g. DND26-928174
  customerName: string;
  email: string;
  phone: string;
  categoryId: TicketCategoryId;
  ticketCount: number; // number of passes/tickets selected
  totalAttendees: number; // ticketCount * entryCount
  categoryPrice: number;
  addOns: BookingAddOns;
  subtotal: number;
  discount: number;
  promoCode?: string;
  totalAmount: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cash';
  paymentStatus: 'PAID' | 'CONFIRMED' | 'REFUNDED';
  transactionId: string;
  createdAt: string;
  checkedIn: boolean;
  checkedInAt?: string;
  gateNumber: string;
}

export interface EventDetails {
  name: string;
  subTitle: string;
  date: string;
  time: string;
  gatesOpen: string;
  venueName: string;
  venueAddress: string;
  city: string;
  dressCode: string;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
}

export const EVENT_DETAILS: EventDetails = {
  name: 'Dandiya Night 2026',
  subTitle: 'The Grand Navratri Raas-Garba Mahotsav',
  date: 'Saturday, October 18, 2026',
  time: '6:30 PM to 11:30 PM IST',
  gatesOpen: '5:30 PM IST',
  venueName: 'The Royal Palace Lawns & Arena',
  venueAddress: 'Gate 4, Jayamahal Road, Palace Grounds, Vasanth Nagar',
  city: 'Bengaluru, Karnataka 560052',
  dressCode: 'Traditional Festive Chaniya Choli / Kurta Pajama / Kediya',
  organizer: 'Royal Cultural Events & UTSAV Arts Guild',
  contactEmail: 'support@dandiyanight2026.com',
  contactPhone: '+91 98450 12026'
};

export const TICKET_CATEGORIES: TicketCategory[] = [
  {
    id: 'regular',
    name: 'Regular Pass',
    tagline: 'Standard Arena Access',
    price: 299,
    entryCount: 1,
    description: 'Access to main Garba dance circular arena with live DJ beats and folk performances.',
    perks: [
      'General Dandiya arena entry (1 Person)',
      'Live Bollywood & Folk DJ sets',
      'Food street & stalls access',
      'Festival photo-ops'
    ],
    dandiyaIncluded: false,
    color: {
      bg: 'bg-amber-950/30',
      border: 'border-amber-500/40',
      badge: 'bg-amber-500/20 text-amber-300',
      text: 'text-amber-400'
    }
  },
  {
    id: 'vip',
    name: 'VIP Pass',
    tagline: 'Priority Access & Premium Perks',
    price: 599,
    entryCount: 1,
    recommended: true,
    description: 'Fast-track gate entry, complimentary wooden Dandiya pair, and front-stage circular ring access.',
    perks: [
      'Priority VIP express entry gate (1 Person)',
      '1 Free pair of carved Dandiya sticks',
      'Front-tier stage Garba dancing circle',
      'Complimentary welcome mocktail / sharbat',
      'Exclusive air-conditioned rest lounge'
    ],
    dandiyaIncluded: true,
    color: {
      bg: 'bg-rose-950/30',
      border: 'border-rose-500/50',
      badge: 'bg-rose-500/20 text-rose-300',
      text: 'text-rose-400'
    }
  },
  {
    id: 'couple',
    name: 'Couple Pass',
    tagline: 'Curated for Pairs & Duos',
    price: 999,
    entryCount: 2,
    description: 'Complete package for couples with dual express entry, 2 pairs of Dandiya sticks, and couple photo booth.',
    perks: [
      'Entry for 2 People together',
      '2 Complimentary pairs of Dandiya sticks',
      'Free 360° spinning photo-booth video session',
      '₹100 food & beverage coupon included',
      'Entry into Best Dressed Couple Garba Contest'
    ],
    dandiyaIncluded: true,
    color: {
      bg: 'bg-purple-950/30',
      border: 'border-purple-500/50',
      badge: 'bg-purple-500/20 text-purple-300',
      text: 'text-purple-400'
    }
  },
  {
    id: 'group',
    name: 'Group Pass',
    tagline: 'Squash & Squad Fiesta (5 Persons)',
    price: 2499,
    entryCount: 5,
    description: 'Ultimate squad pass for friends & families up to 5 people with bundled sticks and reserved table lounge.',
    perks: [
      'Entry for up to 5 Friends / Family members',
      '5 Pairs of colorful Dandiya sticks included',
      'Reserved group high-table standing lounge',
      '₹300 Food street snack platter vouchers',
      'Fast-track group turnstile clearance'
    ],
    dandiyaIncluded: true,
    color: {
      bg: 'bg-emerald-950/30',
      border: 'border-emerald-500/50',
      badge: 'bg-emerald-500/20 text-emerald-300',
      text: 'text-emerald-400'
    }
  }
];
