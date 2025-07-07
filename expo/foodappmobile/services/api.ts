import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Types
export interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
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
  address: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  createdAt: string;
}

// Product APIs
export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/product');
    return response.data;
  },
  
  create: async (product: Omit<Product, '_id' | 'createdAt'>): Promise<Product> => {
    const response = await api.post('/product', product);
    return response.data;
  },
};

// Cart APIs
export const cartAPI = {
  getCart: async (userId: string): Promise<Cart> => {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  },
  
  updateCart: async (userId: string, items: CartItem[]): Promise<Cart> => {
    const response = await api.post(`/cart/${userId}`, { items });
    return response.data;
  },
  
  clearCart: async (userId: string): Promise<void> => {
    await api.delete(`/cart/${userId}`);
  },
};

// Order APIs
export const orderAPI = {
  createOrder: async (orderData: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    const response = await api.post('/order', orderData);
    return response.data;
  },
  
  getUserOrders: async (userId: string): Promise<Order[]> => {
    const response = await api.get(`/order/user/${userId}`);
    return response.data;
  },
  
  getOrder: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/order/${orderId}`);
    return response.data;
  },
  
  updateOrderStatus: async (orderId: string, status: Order['status'], location?: Order['location']): Promise<Order> => {
    const response = await api.patch(`/order/${orderId}`, { status, location });
    return response.data;
  },
};

// User APIs
export const userAPI = {
  register: async (userData: Omit<User, '_id' | 'createdAt'> & { password: string }): Promise<User> => {
    const response = await api.post('/user/register', userData);
    return response.data;
  },
  
  login: async (username: string, password: string): Promise<User> => {
    const response = await api.post('/user/login', { username, password });
    return response.data;
  },
  
  getUser: async (userId: string): Promise<User> => {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  },
};

export default api; 