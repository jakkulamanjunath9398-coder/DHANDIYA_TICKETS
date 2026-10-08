import { Booking, TicketCategoryId } from '../types';

const STORAGE_KEY = 'dandiya_night_2026_bookings';

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'DND26-784291',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '9845123456',
    categoryId: 'couple',
    ticketCount: 1,
    totalAttendees: 2,
    categoryPrice: 999,
    addOns: { dandiyaPairs: 0, foodCoupons: 1 },
    subtotal: 1199,
    discount: 100,
    promoCode: 'GARBA2026',
    totalAmount: 1099,
    paymentMethod: 'upi',
    paymentStatus: 'CONFIRMED',
    transactionId: 'UPI-98421094821',
    createdAt: '2026-10-06T18:24:00.000Z',
    checkedIn: false,
    gateNumber: 'Gate B - Royal Arch'
  },
  {
    id: 'DND26-619042',
    customerName: 'Pooja Patel',
    email: 'pooja.patel@example.com',
    phone: '9876543210',
    categoryId: 'vip',
    ticketCount: 2,
    totalAttendees: 2,
    categoryPrice: 599,
    addOns: { dandiyaPairs: 0, foodCoupons: 0 },
    subtotal: 1198,
    discount: 0,
    totalAmount: 1198,
    paymentMethod: 'card',
    paymentStatus: 'CONFIRMED',
    transactionId: 'TXN-CARD-8840192',
    createdAt: '2026-10-07T11:15:00.000Z',
    checkedIn: true,
    checkedInAt: '2026-10-18T17:45:00.000Z',
    gateNumber: 'Gate A - VIP Pavilion'
  },
  {
    id: 'DND26-451280',
    customerName: 'Rohan Deshmukh',
    email: 'rohan.deshmukh@example.com',
    phone: '9123456789',
    categoryId: 'regular',
    ticketCount: 4,
    totalAttendees: 4,
    categoryPrice: 299,
    addOns: { dandiyaPairs: 2, foodCoupons: 2 },
    subtotal: 1894,
    discount: 0,
    totalAmount: 1894,
    paymentMethod: 'upi',
    paymentStatus: 'CONFIRMED',
    transactionId: 'UPI-771829034',
    createdAt: '2026-10-07T14:40:00.000Z',
    checkedIn: false,
    gateNumber: 'Gate C - General Entry'
  },
  {
    id: 'DND26-903114',
    customerName: 'Kavita Mehta',
    email: 'kavita.m@example.com',
    phone: '9988776655',
    categoryId: 'group',
    ticketCount: 1,
    totalAttendees: 5,
    categoryPrice: 2499,
    addOns: { dandiyaPairs: 0, foodCoupons: 1 },
    subtotal: 2699,
    discount: 200,
    promoCode: 'UTSAV2026',
    totalAmount: 2499,
    paymentMethod: 'netbanking',
    paymentStatus: 'CONFIRMED',
    transactionId: 'NB-990412883',
    createdAt: '2026-10-07T20:10:00.000Z',
    checkedIn: false,
    gateNumber: 'Gate A - Group Pavilion'
  }
];

export const getStoredBookings = (): Booking[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_BOOKINGS;
  } catch {
    return INITIAL_BOOKINGS;
  }
};

export const saveBooking = (newBooking: Booking): Booking[] => {
  const current = getStoredBookings();
  const updated = [newBooking, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
  return updated;
};

export const toggleCheckIn = (bookingId: string): Booking[] => {
  const current = getStoredBookings();
  const updated = current.map(b => {
    if (b.id === bookingId) {
      const nextCheckedIn = !b.checkedIn;
      return {
        ...b,
        checkedIn: nextCheckedIn,
        checkedInAt: nextCheckedIn ? new Date().toISOString() : undefined
      };
    }
    return b;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update booking status', err);
  }
  return updated;
};

export const findBookingByIdOrPhone = (query: string): Booking[] => {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];
  const bookings = getStoredBookings();
  return bookings.filter(b => 
    b.id.toLowerCase().includes(clean) ||
    b.phone.replace(/\D/g, '').includes(clean.replace(/\D/g, '')) ||
    b.email.toLowerCase().includes(clean) ||
    b.customerName.toLowerCase().includes(clean)
  );
};

export const generateBookingId = (): string => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DND26-${randomNum}`;
};

export const resetBookingsToDefault = (): Booking[] => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
  } catch (e) {
    console.error(e);
  }
  return INITIAL_BOOKINGS;
};
