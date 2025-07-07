import axios from 'axios';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ProductDetails from '../../../components/ProductDetails/ProductDetails';
import { endpoints } from '../../../config/apiConfig';
import { CartItem, Product } from '../../../types';
import { AuthContext } from '../../_layout';

export default function ProductDetailScreen() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    // Initialize product from params
    useEffect(() => {
        try {
            if (params.product) {
                const parsed = JSON.parse(params.product as string);
                setProduct(parsed);
            }
        } catch (e) {
            console.error('Error parsing product from params:', e);
        } finally {
            setLoading(false); // ✅ ALWAYS stop loading
        }
    }, [params.product]);

    // Add to cart handler
    const handleAddToCart = async () => {
        if (!product) return;

        try {
            if (user) {
                const item: CartItem = {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                };

                await axios.post(endpoints.addToCart(user._id), item);
                Alert.alert('Thành công', 'Đã thêm vào giỏ hàng!');
            } else {
                Alert.alert('Thông báo', 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            Alert.alert('Lỗi', 'Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.');
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#FF5722" />
            </View>
        );
    }

    if (!product) {
        console.log('No product data available');
        return (
            <View style={[styles.container, styles.errorContainer]}>
                <Text style={styles.errorText}>Không thể tải thông tin sản phẩm</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ProductDetails
                product={product as Product}
                onAddToCart={handleAddToCart}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#FF5722',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});