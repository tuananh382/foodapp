import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Order } from '../../services/api';
import styles from './styles';

// Use regular Image if ExpoImage is causing issues
// import { Image as ExpoImage } from 'expo-image';

interface OrdersScreenProps {
    orders: Order[];
    onSelectOrder: (order: Order) => void;
}

export default function OrdersScreen({ orders, onSelectOrder }: OrdersScreenProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // State for filter
    const [filter, setFilter] = useState<string | null>(null);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    // Filter orders
    const filteredOrders = filter
        ? orders.filter(order => order.status === filter)
        : orders;

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return '#4caf50';
            case 'processing':
                return '#2196f3';
            case 'delivered':
                return '#9c27b0';
            default:
                return '#ff9800';
        }
    };

    // Translate status
    const translateStatus = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Hoàn thành';
            case 'processing':
                return 'Đang xử lý';
            case 'delivered':
                return 'Đã giao hàng';
            case 'cancelled':
                return 'Đã hủy';
            case 'pending':
                return 'Chờ xác nhận';
            default:
                return 'Đang giao hàng';
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
            </View>

            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === null && styles.filterButtonActive]}
                        onPress={() => setFilter(null)}
                    >
                        <Text style={[styles.filterText, filter === null && styles.filterTextActive]}>Tất cả</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'processing' && styles.filterButtonActive]}
                        onPress={() => setFilter('processing')}
                    >
                        <Text style={[styles.filterText, filter === 'processing' && styles.filterTextActive]}>Đang xử lý</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'delivery' && styles.filterButtonActive]}
                        onPress={() => setFilter('delivery')}
                    >
                        <Text style={[styles.filterText, filter === 'delivery' && styles.filterTextActive]}>Đang giao</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'delivered' && styles.filterButtonActive]}
                        onPress={() => setFilter('delivered')}
                    >
                        <Text style={[styles.filterText, filter === 'delivered' && styles.filterTextActive]}>Đã giao</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
                        onPress={() => setFilter('completed')}
                    >
                        <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>Hoàn thành</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {filteredOrders.length > 0 ? (
                <FlatList
                    data={filteredOrders}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.orderCard}
                            onPress={() => onSelectOrder(item)}
                        >
                            <View style={styles.orderHeader}>
                                <Text style={styles.orderIdText}>#{typeof item._id === 'string' ? item._id.slice(-6) : 'N/A'}</Text>
                                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                                    <Text style={styles.statusText}>{translateStatus(item.status)}</Text>
                                </View>
                            </View>

                            <View style={styles.orderInfo}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Ngày đặt</Text>
                                    <Text style={styles.infoValue}>{item.createdAt ? formatDate(item.createdAt) : 'N/A'}</Text>
                                </View>

                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Món</Text>
                                    <Text style={styles.infoValue}>{item.items.length} món</Text>
                                </View>

                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Tổng</Text>
                                    <Text style={styles.totalValue}>{item.total}k</Text>
                                </View>
                            </View>

                            <View style={styles.itemsPreview}>
                                {item.items.slice(0, 3).map((orderItem, index) => (
                                    <View key={index} style={styles.previewItem}>
                                        {orderItem.product?.image ? (
                                            <Image
                                                source={{ uri: orderItem.product.image }}
                                                style={styles.previewImage}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <View style={styles.previewPlaceholder}>
                                                <Text style={styles.previewPlaceholderText}>
                                                    {orderItem.product?.name && orderItem.product.name.length > 0 ? orderItem.product.name[0] : '?'}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                ))}
                                {item.items.length > 3 && (
                                    <View style={styles.moreItems}>
                                        <Text style={styles.moreItemsText}>+{item.items.length - 3}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        {filter ? 'Không có đơn hàng trong trạng thái này' : 'Bạn chưa có đơn hàng nào'}
                    </Text>
                    <TouchableOpacity
                        style={styles.browseButton}
                        onPress={() => router.push('/(tabs)/products')}
                    >
                        <Text style={styles.browseButtonText}>Đặt món ngay</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
