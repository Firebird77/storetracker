import type { Store } from './types';

const CITIES = [
  { city: 'Paris', lat: 48.8566, lng: 2.3522 },
  { city: 'Lyon', lat: 45.764, lng: 4.8357 },
  { city: 'Marseille', lat: 43.2965, lng: 5.3698 },
  { city: 'Bordeaux', lat: 44.8378, lng: -0.5792 },
  { city: 'Lille', lat: 50.6292, lng: 3.0573 },
];

const BRANDS = ['Atelier Mode', 'Casa Nova', 'Run Club', 'Pixel Store', 'Belle Peau'];

export const MOCK_STORES: Store[] = Array.from({ length: 100 }, (_, i) => {
  const { city, lat, lng } = CITIES[i % CITIES.length]!;
  return {
    id: String(i + 1),
    name: `${BRANDS[Math.floor(i / CITIES.length) % BRANDS.length]} ${city} ${i + 1}`,
    address: `${(i % 90) + 1} rue du Commerce`,
    city,
    latitude: lat + ((i % 10) - 5) * 0.003,
    longitude: lng + ((i % 7) - 3) * 0.004,
    openingHours: [...Array<string>(6).fill('09:30 - 19:00'), i % 3 === 0 ? '10:00 - 13:00' : 'Fermé'],
  };
});
