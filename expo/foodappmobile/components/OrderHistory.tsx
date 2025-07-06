import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  onTrack: (order: Order) => void;
}

export default function OrderHistory({ orders, onTrack }: OrderHistoryProps) {
  return (
    <View>
      <Text style={styles.header}>Lịch sử đơn hàng</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onTrack(item)}>
            <View style={styles.itemRow}>
              <Text>#{item._id.slice(-4)} - {item.status} - {item.total}k</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Chưa có đơn hàng</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontWeight: 'bold', fontSize: 18, marginVertical: 8 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
});
