import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticTab } from '../../components/HapticTab';
import TabBarBackground from '../../components/ui/TabBarBackground';
import Colors from '../../constants/Colors';

// Simple tab icon component since we might not have IconSymbol
const TabIcon = ({ name, color }: { name: string, color: string }) => (
  <Text style={{ fontSize: 24, color }}>{name}</Text>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="🏠" color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <TabIcon name="🍽️" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <TabIcon name="🛒" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <TabIcon name="📦" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon name="👤" color={color} />,
        }}
      />

      {/* Hidden screens */}
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null, // Hide this from tab bar
        }}
      />
      <Tabs.Screen
        name="orders/[id]"
        options={{
          href: null, // Hide this from tab bar
        }}
      />
    </Tabs>
  );
}
