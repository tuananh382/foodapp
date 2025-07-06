import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Product, CartItem } from '../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <View>
      <Text style={styles.header}>Danh sách món ăn</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name} - {item.price}k</Text>
            <Button title="Thêm" onPress={() => onAddToCart({
              productId: item._id,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: 1,
            })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontWeight: 'bold', fontSize: 18, marginVertical: 8 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
});
