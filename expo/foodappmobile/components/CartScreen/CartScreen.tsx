import { Image as ExpoImage } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandColors } from '../../constants/Colors';
import { CartItem } from '../../types';
import styles from './styles';

interface CartScreenProps {
    cart: CartItem[];
    onUpdateQuantity: (productId: string, newQuantity: number) => void;
    onRemoveItem: (productId: string) => void;
    onCheckout: () => void;
}

export default function CartScreen({ cart, onUpdateQuantity, onRemoveItem, onCheckout }: CartScreenProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Giỏ hàng</Text>
                    <View style={styles.backButton}></View> {/* Empty view for alignment */}
                </View>

                <View style={styles.emptyContainer}>
                    {/* <ExpoImage
                        source={require('../../assets/images/empty-cart.png')}
                        style={styles.emptyImage}
                        contentFit="contain"
                    /> */}
                    <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
                    <TouchableOpacity
                        style={styles.browseButton}
                        onPress={() => router.push('/(tabs)/products')}
                    >
                        <Text style={styles.browseButtonText}>Xem thực đơn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Giỏ hàng</Text>
                <View style={styles.backButton}></View> {/* Empty view for alignment */}
            </View>

            <FlatList
                data={cart}
                keyExtractor={(item) => item.productId}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <View style={styles.itemImage}>
                            {item.image ? (
                                <ExpoImage
                                    source={{ uri: item.image }}
                                    style={{ width: '100%', height: '100%' }}
                                    contentFit="cover"
                                />
                            ) : (
                                <View style={styles.placeholderImage}>
                                    <Text style={styles.placeholderText}>{item.name[0]}</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price}k</Text>
                        </View>

                        <View style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => {
                                    if (item.quantity > 1) {
                                        onUpdateQuantity(item.productId, item.quantity - 1);
                                    } else {
                                        onRemoveItem(item.productId);
                                    }
                                }}
                            >
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>{item.quantity}</Text>

                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <View style={[styles.summaryContainer, { paddingBottom: insets.bottom || 16 }]}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Tổng</Text>
                    <Text style={styles.summaryTotal}>{totalPrice}k</Text>
                </View>

                <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
                    <LinearGradient
                        colors={[BrandColors.primary, BrandColors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

