import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product } from '../../types';
import styles from './styles';

interface ProductDetailsProps {
    product: Product;
    onAddToCart: () => void;
}

export default function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chi tiết món ăn</Text>
                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => router.push('/(tabs)/cart')}
                >
                    <Text style={styles.cartButtonText}>🛒</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    {product.image ? (
                        <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.noImageContainer}>
                            <Text style={styles.noImageText}>No Image</Text>
                        </View>
                    )}
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}k</Text>

                    {product.description && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Mô tả</Text>
                            <Text style={styles.description}>{product.description}</Text>
                        </View>
                    )}

                    {product.ingredients && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Nguyên liệu</Text>
                            <Text style={styles.details}>{product.ingredients}</Text>
                        </View>
                    )}

                    {product.nutritionFacts && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Thông tin dinh dưỡng</Text>
                            <Text style={styles.details}>{product.nutritionFacts}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Add to Cart Button */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={onAddToCart}
                >
                    <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

