export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: string;
  address: string;
  location: { lat: number; lng: number };
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}
