import axios from 'axios';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { endpoints } from '@/config/apiConfig';
import ProductListScreen from '../../components/ProductList/ProductListScreen';
import { CartItem, Category, Product } from '../../types';
import { AuthContext } from '../_layout';

const API_URL = 'https://foodapp-d0ov.onrender.com/api'; // Update with your actual API URL

export default function ProductsScreen() {
    const { user } = useContext(AuthContext);
    const { category } = useLocalSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([
        { _id: '1', name: 'Bún' },
        { _id: '2', name: 'Phở' },
        { _id: '3', name: 'Cơm' },
        { _id: '4', name: 'Đồ uống' },
    ]);

    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/product`);
            console.log(response.data)
            setProducts(response.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([])
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Add to cart handler
    const handleAddToCart = async (item: CartItem) => {
        try {
            if (user) {
                await axios.post(endpoints.addToCart(user._id), item);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ProductListScreen
                products={products}
                categories={categories}
                onAddToCart={handleAddToCart}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});