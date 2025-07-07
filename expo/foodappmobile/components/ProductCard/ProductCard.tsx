import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../types';
import styles from './styles';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
    onAddToCart: () => void;
}

export default function ProductCard({ product, onPress, onAddToCart }: ProductCardProps) {
    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.cardContent} onPress={onPress}>
                {product.image ? (
                    <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                )}

                <View style={styles.details}>
                    <Text style={styles.name} numberOfLines={1}>
                        {product.name}
                    </Text>

                    {product.description && (
                        <Text style={styles.description} numberOfLines={1}>
                            {product.description}
                        </Text>
                    )}

                    <Text style={styles.price}>{product.price}k</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}