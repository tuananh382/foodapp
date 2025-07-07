import axios from 'axios';
import { Stack, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { endpoints } from '@/config/apiConfig';
import OrdersScreen from '../../components/OrdersScreen/OrdersScreen';
import { Order } from '../../types';
import { AuthContext } from '../_layout';

const API_URL = 'https://foodapp-d0ov.onrender.com/api'; // Update with your actual API URL

export default function OrdersTabScreen() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);

    // Fetch orders
    const fetchOrders = async () => {
        try {
            if (user) {
                console.log("Fetching orders for user:", user._id);
                const response = await axios.get(endpoints.getCart(user._id));
                console.log(response.data);
                setOrders(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    // Handle selecting an order
    const handleSelectOrder = (order: Order) => {
        router.push({
            pathname: `/(tabs)/orders/[id]`,
            params: { id: order._id }
        });
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <OrdersScreen
                orders={orders}
                onSelectOrder={handleSelectOrder}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});