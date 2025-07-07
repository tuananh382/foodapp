import axios from 'axios';
import { Stack, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import CartScreen from '../../components/CartScreen/CartScreen';
import { CartItem } from '../../types';
import { AuthContext } from '../_layout';

const API_URL = 'https://foodapp-d0ov.onrender.com/api'; // Update with your actual API URL

export default function CartTabScreen() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);

    // Fetch cart
    const fetchCart = async () => {
        try {
            if (user) {
                const response = await axios.get(`${API_URL}/cart/${user._id}`);
                setCart(response.data?.items || []);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            // If API fails, set some dummy data
            setCart([
                {
                    productId: '1',
                    name: 'Bún bò Huế',
                    price: 55,
                    quantity: 1,
                },
                {
                    productId: '3',
                    name: 'Cơm tấm sườn bì chả',
                    price: 65,
                    quantity: 2,
                }
            ]);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    // Update item quantity
    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        try {
            const updatedCart = cart.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            );

            setCart(updatedCart);

            if (user) {
                await axios.put(`${API_URL}/cart/${user._id}`, {
                    items: updatedCart
                });
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // Remove item
    const handleRemoveItem = async (productId: string) => {
        try {
            const updatedCart = cart.filter(item => item.productId !== productId);

            setCart(updatedCart);

            if (user) {
                await axios.put(`${API_URL}/cart/${user._id}`, {
                    items: updatedCart
                });
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    // Checkout
    const handleCheckout = async () => {
        if (cart.length === 0) {
            Alert.alert('Giỏ hàng trống', 'Vui lòng thêm món ăn vào giỏ hàng trước khi thanh toán.');
            return;
        }

        try {
            // Process order directly
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const address = '123 Đường ABC, Quận 1, TP.HCM'; // In a real app, get this from user input
            const orderData = {
                userId: user._id,
                items: cart,
                total,
                address,
                status: 'pending'
            };

            const response = await axios.post(`${API_URL}/order`, orderData);

            if (response.data) {
                // Clear cart after successful order
                await axios.put(`${API_URL}/cart/${user._id}`, { items: [] });
                setCart([]);

                // Show success message
                Alert.alert(
                    'Đặt hàng thành công',
                    'Đơn hàng của bạn đã được gửi đi thành công!',
                    [{ text: 'Xem đơn hàng', onPress: () => router.push(`/(tabs)/orders/${response.data._id}`) }]
                );
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi thanh toán. Vui lòng thử lại sau.');
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <CartScreen
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});