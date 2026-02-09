
export enum AppView {
  HOME = 'home',
  SCHEDULE = 'schedule',
  STOCK = 'stock',
  CAMPAIGNS = 'campaigns',
  PROFILE = 'profile',
  SPEC = 'spec'
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  km: number;
  price: number;
  image: string;
  type: 'NEW' | 'USED';
  transmission: string;
  fuel: string;
  unit: string;
}

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  validUntil: string;
}

export interface Appointment {
  id: string;
  unit: string;
  brand: string;
  service: string;
  date: string;
  time: string;
  vehiclePlate?: string;
}
