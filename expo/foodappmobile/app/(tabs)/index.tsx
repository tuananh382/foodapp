import axios from 'axios';
import { Stack } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { endpoints } from '@/config/apiConfig';
import DashboardScreen from '../../components/Dashboard/DashboardScreen';
import { CartItem, Order, Product } from '../../types';
import { AuthContext } from '../_layout';

const API_URL = 'https://foodapp-d0ov.onrender.com/api'; // Update with your actual API URL

export default function TabOneScreen() {
  const { user, setUser } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch recent orders
  const fetchRecentOrders = async () => {
    try {
      if (user) {
        const response = await axios.get(`${API_URL}/order/user/${user._id}`);
        setRecentOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRecentOrders();
  }, [user]);

  // Add to cart handler
  const handleAddToCart = async (item: CartItem) => {
    try {
      // Add logic to add to cart via API
      await axios.post(endpoints.addToCart(user._id), item);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };    // Logout handler
  const handleLogout = async () => {
    await setUser(null);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <DashboardScreen
        user={user}
        products={products}
        recentOrders={recentOrders}
        onAddToCart={handleAddToCart}
        onLogout={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
