import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { CartProvider } from '../contexts/CartContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Create AuthContext
export const AuthContext = createContext<{
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}>({
  user: null,
  setUser: () => null,
});

// Create a provider that will manage the authentication state
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  // Check if the user is authenticated and navigate accordingly
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for stored user data
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.error('Failed to get user data', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';
    const inCheckoutGroup = segments[0] === 'checkout' || segments[0] === 'order-success';

    if (!user && !inAuthGroup) {
      // If not logged in and not on auth screen, redirect to auth
      router.replace('/auth');
    } else if (user && !inTabsGroup && !inCheckoutGroup) {
      // If logged in and not in tabs or checkout, redirect to tabs
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading, router]);

  const authContext = {
    user,
    setUser: async (userData: any) => {
      try {
        if (userData) {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } else {
          await AsyncStorage.removeItem('user');
        }
        setUser(userData);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="checkout" options={{ headerShown: false }} />
              <Stack.Screen name="order-success" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
