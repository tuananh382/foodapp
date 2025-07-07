import axios from 'axios';
import { Stack } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ProfileScreen from '../../components/ProfileScreen/ProfileScreen';
import { endpoints } from '../../config/apiConfig';
import { Order, User } from '../../types';
import { AuthContext } from '../_layout';

export default function ProfileTabScreen() {
    const { user, setUser } = useContext(AuthContext);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);

    // Fetch recent orders for the profile page
    const fetchRecentOrders = async () => {
        try {
            if (user) {
                console.log("Fetching orders for user:", user._id);
                const response = await axios.get(endpoints.getUserOrders(user._id));

                if (response.data && Array.isArray(response.data)) {
                    setRecentOrders(response.data);
                }
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Set dummy orders if API fails
            // setRecentOrders(getDummyOrders());
        }
    };

    // const getDummyOrders = (): Order[] => {
    //     return [
    //         {
    //             _id: 'order1',
    //             userId: user?._id || 'user1',
    //             items: [
    //                 { productId: '1', name: 'Bún bò Huế', price: 55, quantity: 1 },
    //                 { productId: '4', name: 'Trà đào cam sả', price: 35, quantity: 2 }
    //             ],
    //             total: 125,
    //             status: 'processing',
    //             createdAt: new Date().toISOString(),
    //             address: '123 Đường ABC, Quận 1, TP.HCM'
    //         },
    //         {
    //             _id: 'order2',
    //             userId: user?._id || 'user1',
    //             items: [
    //                 { productId: '2', name: 'Phở bò tái', price: 50, quantity: 1 }
    //             ],
    //             total: 50,
    //             status: 'delivered',
    //             createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
    //             address: '123 Đường ABC, Quận 1, TP.HCM'
    //         }
    //     ];
    // };

    useEffect(() => {
        fetchRecentOrders();
    }, [user]);

    // Handle logout
    const handleLogout = async () => {
        try {
            await setUser(null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Handle profile update
    const handleUpdateProfile = async (updatedUser: User): Promise<boolean> => {
        try {
            // In a real app, this would send the updated user data to the API
            if (user && user._id) {
                // Make API call to update user
                // const response = await axios.put(`${API_URL}/user/${user._id}`, updatedUser);

                // For now, just update the user in context
                await setUser({
                    ...user,
                    ...updatedUser
                });

                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating profile:', error);
            return false;
        }
    };

    if (!user) {
        return null; // This shouldn't happen as auth routing should redirect
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ProfileScreen
                user={user}
                recentOrders={recentOrders}
                onLogout={handleLogout}
                onUpdateProfile={handleUpdateProfile}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});