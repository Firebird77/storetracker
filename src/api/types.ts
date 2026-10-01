export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  openingHours: string[];
}

export interface Page<T> {
  items: T[];
  page: number;
  hasMore: boolean;
}
