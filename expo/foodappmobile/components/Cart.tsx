import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
}

export default function Cart({ cart }: CartProps) {
  return (
    <View>
      <Text style={styles.header}>Giỏ hàng</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name} x{item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Giỏ hàng trống</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontWeight: 'bold', fontSize: 18, marginVertical: 8 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
});
