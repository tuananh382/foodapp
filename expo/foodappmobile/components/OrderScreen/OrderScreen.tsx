import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandColors } from '../../constants/Colors';
import { CartItem, Order } from '../../types';
import styles from './styles';

interface OrderScreenProps {
    order: Order;
    onTrackOrder?: () => void;
}

export default function OrderScreen({ order, onTrackOrder }: OrderScreenProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Format date for display
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    // Get status color and text
    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'completed':
                return { color: '#4caf50', text: 'Hoàn thành' };
            case 'processing':
                return { color: '#2196f3', text: 'Đang xử lý' };
            case 'delivered':
                return { color: '#9c27b0', text: 'Đã giao' };
            case 'pending':
                return { color: '#ff9800', text: 'Chờ xác nhận' };
            case 'cancelled':
                return { color: '#f44336', text: 'Đã hủy' };
            default:
                return { color: '#9e9e9e', text: 'Không xác định' };
        }
    };

    // Calculate total
    const calculateTotal = (items: CartItem[]) => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const statusInfo = getStatusInfo(order.status);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chi tiết đơn hàng</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.orderHeader}>
                    <View>
                        <Text style={styles.orderIdText}>Mã đơn: #{typeof order._id === 'string' ? order._id.slice(-6) : 'N/A'}</Text>
                        <Text style={styles.dateText}>
                            Đặt hàng: {order.createdAt ? formatDate(order.createdAt) : 'N/A'}
                        </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
                        <Text style={styles.statusText}>{statusInfo.text}</Text>
                    </View>
                </View>

                {/* Status timeline */}
                <View style={styles.timeline}>
                    <View style={[
                        styles.timelineStep,
                        styles.timelineStepActive,
                        { backgroundColor: BrandColors.primary }
                    ]}>
                        <Text style={styles.timelineStepText}>1</Text>
                    </View>
                    <View style={[
                        styles.timelineConnector,
                        (order.status !== 'pending') && styles.timelineConnectorActive
                    ]} />
                    <View style={[
                        styles.timelineStep,
                        (order.status !== 'pending') && styles.timelineStepActive
                    ]}>
                        <Text style={styles.timelineStepText}>2</Text>
                    </View>
                    <View style={[
                        styles.timelineConnector,
                        (order.status === 'delivered' || order.status === 'completed') && styles.timelineConnectorActive
                    ]} />
                    <View style={[
                        styles.timelineStep,
                        (order.status === 'delivered' || order.status === 'completed') && styles.timelineStepActive
                    ]}>
                        <Text style={styles.timelineStepText}>3</Text>
                    </View>
                </View>
                <View style={styles.timelineLabels}>
                    <Text style={styles.timelineLabel}>Đặt hàng</Text>
                    <Text style={styles.timelineLabel}>Đang giao</Text>
                    <Text style={styles.timelineLabel}>Hoàn thành</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
                    <Text style={styles.addressText}>{order.address || 'Không có địa chỉ'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sản phẩm</Text>
                    {order.items.map((item, index) => (
                        <View key={index} style={styles.orderItem}>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                                <Text style={styles.itemName}>{item.name}</Text>
                            </View>
                            <Text style={styles.itemPrice}>{item.price * item.quantity}k</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thanh toán</Text>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Tạm tính</Text>
                        <Text style={styles.paymentValue}>{calculateTotal(order.items)}k</Text>
                    </View>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Phí vận chuyển</Text>
                        <Text style={styles.paymentValue}>15k</Text>
                    </View>
                    <View style={[styles.paymentRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Tổng cộng</Text>
                        <Text style={styles.totalValue}>{order.total}k</Text>
                    </View>
                </View>
            </ScrollView>

            {(order.status === 'processing' || order.status === 'delivery') && (
                <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
                    <TouchableOpacity style={styles.trackButton} onPress={onTrackOrder}>
                        <Text style={styles.trackButtonText}>Theo dõi đơn hàng</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}



