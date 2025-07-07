import { Image as ExpoImage } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandColors } from '../../constants/Colors';
import { CartItem, Order, Product } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './styles';

interface DashboardScreenProps {
    user: any;
    products: Product[];
    recentOrders: Order[];
    onAddToCart: (item: CartItem) => void;
    onLogout: () => void;
}

export default function DashboardScreen({ user, products, recentOrders, onAddToCart, onLogout }: DashboardScreenProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Get popular products (filter by isPopular flag)
    const popularProducts = products.filter(product => product.isPopular);

    // Get recommended products (filter by isRecommended flag)
    const recommendedProducts = products.filter(product => product.isRecommended);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Xin chào,</Text>
                        <Text style={styles.username}>{user?.name || user?.username || 'Khách'}</Text>
                    </View>

                    <View style={styles.headerButtons}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => router.push('/(tabs)/cart')}
                        >
                            <Text style={styles.iconButtonText}>🛒</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/(tabs)/profile')}>
                            {user?.avatar ? (
                                <ExpoImage
                                    source={{ uri: user?.avatar }}
                                    style={styles.avatarImage}
                                    contentFit="cover"
                                />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Text style={styles.avatarPlaceholderText}>
                                        {(user?.name || user?.username || 'U')[0].toUpperCase()}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Banner */}
                <TouchableOpacity style={styles.banner} onPress={() => router.push('/(tabs)/products')}>
                    <LinearGradient
                        colors={BrandColors.primaryGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.bannerGradient}
                    >
                        <View style={styles.bannerContent}>
                            <View style={styles.bannerTextContainer}>
                                <Text style={styles.bannerTitle}>Giảm 30%</Text>
                                <Text style={styles.bannerSubtitle}>Cho đơn hàng đầu tiên</Text>
                                <TouchableOpacity style={styles.bannerButton}>
                                    <Text style={styles.bannerButtonText}>Đặt ngay</Text>
                                </TouchableOpacity>
                            </View>

                            {/* <View style={styles.bannerImageContainer}>
                                <ExpoImage
                                    source={require('../../assets/images/banner-food.png')}
                                    style={styles.bannerImage}
                                    contentFit="contain"
                                />
                            </View> */}
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Categories */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Danh mục</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/products')}>
                            <Text style={styles.seeAllText}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categoriesContainer}>
                        {['Bún', 'Phở', 'Cơm', 'Đồ uống'].map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.categoryItem}
                                onPress={() => router.push({
                                    pathname: '/(tabs)/products',
                                    params: { category }
                                })}
                            >
                                <View style={styles.categoryIcon}>
                                    <Text style={styles.categoryIconText}>
                                        {['🍜', '🍲', '🍚', '🍹'][index]}
                                    </Text>
                                </View>
                                <Text style={styles.categoryName}>{category}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Popular */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Phổ biến</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/products')}>
                            <Text style={styles.seeAllText}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={popularProducts.slice(0, 5)}
                        keyExtractor={(item) => item._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalListContent}
                        renderItem={({ item }) => (
                            <View style={styles.horizontalCardContainer}>
                                <ProductCard
                                    product={item}
                                    onPress={() => router.push({
                                        pathname: '/(tabs)/product/[id]',
                                        params: {
                                            id: item._id,
                                            productData: encodeURIComponent(JSON.stringify(item))
                                        }
                                    })}
                                    onAddToCart={() => onAddToCart({
                                        productId: item._id,
                                        name: item.name,
                                        price: item.price,
                                        image: item.image,
                                        quantity: 1,
                                    })}
                                />
                            </View>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyListText}>Không có món phổ biến</Text>
                        }
                    />
                </View>

                {/* Recommended */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/products')}>
                            <Text style={styles.seeAllText}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={recommendedProducts.slice(0, 5)}
                        keyExtractor={(item) => item._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalListContent}
                        renderItem={({ item }) => (
                            <View style={styles.horizontalCardContainer}>
                                <ProductCard
                                    product={item}
                                    onPress={() => router.push({
                                        pathname: '/(tabs)/product/[id]',
                                        params: {
                                            id: item._id,
                                            productData: encodeURIComponent(JSON.stringify(item))
                                        }
                                    })}
                                    onAddToCart={() => onAddToCart({
                                        productId: item._id,
                                        name: item.name,
                                        price: item.price,
                                        image: item.image,
                                        quantity: 1,
                                    })}
                                />
                            </View>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyListText}>Không có gợi ý</Text>
                        }
                    />
                </View>

                {/* Recent Orders */}
                {recentOrders.length > 0 && (
                    <View style={[styles.sectionContainer, { marginBottom: insets.bottom + 16 }]}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
                            <TouchableOpacity onPress={() => router.push('/(tabs)/orders')}>
                                <Text style={styles.seeAllText}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>

                        {recentOrders.slice(0, 3).map((order) => (
                            <TouchableOpacity
                                key={order._id}
                                style={styles.orderItem}
                                onPress={() => router.push({
                                    pathname: '/(tabs)/orders/[id]',
                                    params: { id: order._id }
                                })}
                            >
                                <View style={styles.orderIcon}>
                                    <Text style={styles.orderIconText}>📦</Text>
                                </View>

                                <View style={styles.orderDetails}>
                                    <Text style={styles.orderNumber}>Đơn #{order._id.slice(-6)}</Text>
                                    <Text style={styles.orderStatus}>
                                        {order.status === 'completed' ? 'Hoàn thành' :
                                            order.status === 'processing' ? 'Đang xử lý' :
                                                order.status === 'delivered' ? 'Đã giao' : 'Đang giao'}
                                    </Text>
                                </View>

                                <View style={styles.orderPrice}>
                                    <Text style={styles.orderPriceText}>{order.total}k</Text>
                                    <Text style={styles.orderArrow}>→</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

