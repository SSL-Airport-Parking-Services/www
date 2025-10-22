import type { Car, Faq, ParkingOption } from '@/lib/types';

export const parkingOptions: ParkingOption[] = [
  {
    id: 'short-stay',
    title: 'Short Stay',
    description: 'Perfect for quick trips of 1-3 days. Located closest to the terminals for maximum convenience.',
    price: 150,
    icon: 'Plane',
    bestFor: '1-3 Days'
  },
  {
    id: 'long-stay',
    title: 'Long Stay',
    description: 'Ideal for travelers on longer journeys (4+ days). Secure, affordable, with a free shuttle service.',
    price: 120,
    icon: 'CalendarDays',
    bestFor: '4+ Days'
  },
  {
    id: 'valet',
    title: 'Valet Parking',
    description: 'The ultimate convenience for any trip length. Drop your car off at the terminal and go.',
    price: 350,
    icon: 'Car',
    bestFor: 'Ultimate Convenience'
  },
];

export const parkingLocations = [
    { id: 'ort', name: 'O.R. Tambo International' },
    { id: 'cpt', name: 'Cape Town International' },
    { id: 'ksa', name: 'King Shaka International' },
];

export const carTypes: Car[] = [
    { id: 'sedan', name: 'Sedan' },
    { id: 'suv', name: 'SUV' },
    { id: 'hatchback', name: 'Hatchback' },
    { id: 'truck', name: 'Truck / Bakkie' },
];

export const faqs: Faq[] = [
  {
    question: 'How do I book a parking spot?',
    answer:
      'Simply select your preferred parking option on the main page, choose your location, and follow the on-screen instructions to select your car and complete the checkout process.',
  },
  {
    question: 'Can I change my booking?',
    answer:
      'Yes, you can modify your booking up to 24 hours before your scheduled arrival time. Please contact support for assistance. Note: This feature is currently in development.',
  },
  {
    question: 'What are the payment options?',
    answer:
      'We simulate payments via major credit cards (Visa, Mastercard). For this demo, you can use the "Continue with Master Admin Card" option to proceed without actual payment.',
  },
  {
    question: 'Is there a shuttle service from Long Stay parking?',
    answer:
      'Yes, we offer a complimentary shuttle service that runs every 15 minutes, 24/7, between the Long Stay parking area and the main terminal buildings.',
  },
];
