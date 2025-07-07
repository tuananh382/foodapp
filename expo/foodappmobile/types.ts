export interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  createdAt?: string;
  // Additional frontend properties (not in backend schema)
  category?: string;
  ingredients?: string;
  nutritionFacts?: string;
  rating?: number;
  isPopular?: boolean;
  isRecommended?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  updatedAt?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: string; // pending, delivering, completed, cancelled
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface OrderHistory {
  _id?: string;
  userId: string;
  orders: string[] | Order[]; // Array of order IDs or populated Order objects
}

export interface User {
  _id: string;
  username: string;
  name?: string;
  email?: string;
  createdAt?: string;
  // Additional frontend properties (not in backend schema)
  address?: string;
  phone?: string;
  avatar?: string;
}

export interface Category {
  _id: string;
  name: string;
  image?: string;
}
