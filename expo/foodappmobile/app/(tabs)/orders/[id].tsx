import axios from 'axios';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import OrderScreen from '../../../components/OrderScreen/OrderScreen';
import { Order } from '../../../types';
import { AuthContext } from '../../_layout';

const API_URL = 'https://foodapp-d0ov.onrender.com/api'; // Update with your actual API URL

export default function OrderDetailScreen() {
    const { user } = useContext(AuthContext);
    const { id } = useLocalSearchParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch order details
    const fetchOrderDetails = async () => {
        setLoading(true);
        try {
            if (user && id) {
                const response = await axios.get(`${API_URL}/order/${id}`);

                if (response.data) {
                    setOrder(response.data);
                } else {
                    // Set dummy order if API returns nothing
                    setOrder(getDummyOrder(id as string));
                }
            }
        } catch (error) {
            console.error('Error fetching order:', error);
            // Set dummy order if API fails
            setOrder(getDummyOrder(id as string));
        } finally {
            setLoading(false);
        }
    };

    const getDummyOrder = (orderId: string): Order => {
        return {
            _id: orderId,
            userId: user?._id || 'user1',
            items: [
                { productId: '1', name: 'Bún bò Huế', price: 55, quantity: 1 },
                { productId: '4', name: 'Trà đào cam sả', price: 35, quantity: 2 }
            ],
            total: 125,
            status: 'processing',
            createdAt: new Date().toISOString(),
            address: '123 Đường ABC, Quận 1, TP.HCM',
            location: {
                lat: 10.762622,
                lng: 106.660172
            }
        };
    };

    useEffect(() => {
        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    // Track order handler
    const handleTrackOrder = () => {
        if (!order) return;

        // In a real app, this would open a map view or tracking screen
        Alert.alert(
            'Theo dõi đơn hàng',
            `Đơn hàng #${order._id} đang được giao đến địa chỉ: ${order.address}`
        );
    };

    if (loading || !order) {
        return <View style={styles.container} />;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <OrderScreen
                order={order}
                onTrackOrder={handleTrackOrder}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});