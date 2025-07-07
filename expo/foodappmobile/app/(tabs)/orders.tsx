import { Stack, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import OrdersScreen from '../../components/OrdersScreen/OrdersScreen';
import { Order, orderAPI } from '../../services/api';
import { AuthContext } from '../_layout';

export default function OrdersTabScreen() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);

    // Fetch orders
    const fetchOrders = async () => {
        try {
            if (user) {
                console.log("Fetching orders for user:", user._id);
                const orders = await orderAPI.getUserOrders(user._id);
                console.log("Orders response:", orders);
                setOrders(orders || []);
            } else {
                console.log("No user found, cannot fetch orders");
                setOrders([]);
            }
        } catch (error: any) {
            console.error('Error fetching orders:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            }
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