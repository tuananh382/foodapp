import { Stack } from 'expo-router';
import React, { useContext } from 'react';
import AuthScreen from '../components/AuthScreen/AuthScreen';
import { AuthContext } from './_layout';

const API_URL = 'https://foodapp-d0ov.onrender.com/api'; // Update with your actual API URL

export default function AuthPage() {
    const { setUser } = useContext(AuthContext);

    const handleAuthSuccess = (user: any) => {
        // Set user in the context - this will trigger navigation in AuthProvider
        setUser(user);
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <AuthScreen onAuthSuccess={handleAuthSuccess} API_URL={API_URL} />
        </>
    );
}