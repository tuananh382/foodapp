import { useEffect, useState } from 'react';
import * as React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AuthScreen from './components/AuthScreen';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import TrackingMap from './components/TrackingMap';
import { CartItem, Order, Product } from './types';

const API_URL = 'http://localhost:5000/api'; // Đổi thành IP backend nếu chạy trên thiết bị thật

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [region, setRegion] = useState({ latitude: 10.762622, longitude: 106.660172, latitudeDelta: 0.01, longitudeDelta: 0.01 });
  const [products, setProducts] = useState<Product[]>([]);

  // Lấy giỏ hàng
  const fetchCart = async (userId: string) => {
    const res = await axios.get(`${API_URL}/cart/${userId}`);
    setCart(res.data?.items || []);
  };

  // Lấy lịch sử đơn hàng
  const fetchOrders = async (userId: string) => {
    const res = await axios.get(`${API_URL}/order/user/${userId}`);
    setOrders(res.data);
  };

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/product`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
    if (user) {
      fetchCart(user._id || user.username);
      fetchOrders(user._id || user.username);
    }
  }, [user]);

  // Thêm sản phẩm vào giỏ
  const addToCart = async (product: CartItem) => {
    const newCart = [...cart];
    const idx = newCart.findIndex((item) => item.productId === product.productId);
    if (idx > -1) newCart[idx].quantity += 1;
    else newCart.push({ ...product });
    await axios.post(`${API_URL}/cart/${user._id || user.username}`, { items: newCart });
    fetchCart(user._id || user.username);
  };

  // Đặt hàng
  const placeOrder = async () => {
    if (!cart.length) return Alert.alert('Giỏ hàng trống');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const address = '123 Đường ABC, Quận 1, TP.HCM';
    const location = { lat: region.latitude, lng: region.longitude };
    await axios.post(`${API_URL}/order`, { userId: user._id || user.username, items: cart, total, address, location });
    await axios.delete(`${API_URL}/cart/${user._id || user.username}`);
    fetchCart(user._id || user.username);
    fetchOrders(user._id || user.username);
    Alert.alert('Đặt hàng thành công!');
  };

  // Theo dõi đơn hàng (lấy vị trí từ đơn hàng mới nhất)
  const trackOrder = (order: Order) => {
    setTrackingOrder(order);
    if (order.location) {
      setRegion({
        latitude: order.location.lat,
        longitude: order.location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  if (!user) {
    return <AuthScreen onAuthSuccess={setUser} API_URL={API_URL} />;
  }

  return (
    <View style={styles.container}>
      <ProductList products={products} onAddToCart={addToCart} />
      <Cart cart={cart} />
      <Button title="Đặt hàng" onPress={placeOrder} />
      <OrderHistory orders={orders} onTrack={trackOrder} />
      {trackingOrder && trackingOrder.location && (
        <TrackingMap order={trackingOrder} region={region} />
      )}
      <Button title="Đăng xuất" onPress={() => setUser(null)} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
});
