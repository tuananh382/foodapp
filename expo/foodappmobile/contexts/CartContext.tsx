import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { cartAPI, CartItem, Product } from '../services/api';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from API when user changes
  useEffect(() => {
    if (user?._id) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [user?._id]);

  const loadCart = async () => {
    if (!user?._id) return;
    
    try {
      setIsLoading(true);
      const cart = await cartAPI.getCart(user._id);
      setCartItems(cart.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      Alert.alert('Error', 'Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  const saveCart = async (items: CartItem[]) => {
    if (!user?._id) return;
    
    try {
      await cartAPI.updateCart(user._id, items);
    } catch (error) {
      console.error('Error saving cart:', error);
      Alert.alert('Error', 'Failed to save cart');
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    console.log('Adding to cart:', product.name, 'User:', user?._id);
    
    if (!user?._id) {
      Alert.alert('Error', 'Please login to add items to cart');
      return;
    }

    try {
      const existingItem = cartItems.find(item => item.productId === product._id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = cartItems.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...cartItems, { productId: product._id, quantity, product }];
      }

      console.log('New cart items:', newItems);
      setCartItems(newItems);
      await saveCart(newItems);
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    const newItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(newItems);
    await saveCart(newItems);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    const newItems = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(newItems);
    await saveCart(newItems);
  };

  const clearCart = async () => {
    if (!user?._id) return;
    
    try {
      await cartAPI.clearCart(user._id);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      Alert.alert('Error', 'Failed to clear cart');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 