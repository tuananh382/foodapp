import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandColors } from '../../constants/Colors';
import { Order, User } from '../../types';
import styles from './styles';

interface ProfileScreenProps {
    user: User;
    recentOrders: Order[];
    onLogout: () => void;
    onUpdateProfile: (updatedUser: User) => Promise<boolean>;
}

export default function ProfileScreen({ user, recentOrders, onLogout, onUpdateProfile }: ProfileScreenProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User>({ ...user });

    // Handle profile edit submission
    const handleSubmitEdit = async () => {
        try {
            const success = await onUpdateProfile(editedUser);
            if (success) {
                setIsEditing(false);
                Alert.alert('Thành công', 'Thông tin cá nhân đã được cập nhật');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật thông tin. Vui lòng thử lại sau.');
        }
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditedUser({ ...user });
        setIsEditing(false);
    };

    // Format date for display
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.profileHeader}>
                    <LinearGradient
                        colors={[BrandColors.primary, BrandColors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientBackground}
                    />

                    <View style={styles.avatarContainer}>
                        {user.avatar ? (
                            <Image source={{ uri: user.avatar }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>
                                    {user.name ? user.name[0].toUpperCase() : user.username[0].toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userInfo}>{user.email || 'Chưa cập nhật email'}</Text>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => {
                            if (isEditing) {
                                handleSubmitEdit();
                            } else {
                                setIsEditing(true);
                            }
                        }}
                    >
                        <Text style={styles.editButtonText}>
                            {isEditing ? 'Lưu thông tin' : 'Chỉnh sửa hồ sơ'}
                        </Text>
                    </TouchableOpacity>

                    {isEditing && (
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancelEdit}
                        >
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>

                    <View style={styles.card}>
                        {isEditing ? (
                            <>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Họ tên</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editedUser.name || ''}
                                        onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
                                        placeholder="Nhập họ tên của bạn"
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editedUser.email || ''}
                                        onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                                        placeholder="Nhập email của bạn"
                                        keyboardType="email-address"
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Số điện thoại</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editedUser.phone || ''}
                                        onChangeText={(text) => setEditedUser({ ...editedUser, phone: text })}
                                        placeholder="Nhập số điện thoại của bạn"
                                        keyboardType="phone-pad"
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Địa chỉ</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editedUser.address || ''}
                                        onChangeText={(text) => setEditedUser({ ...editedUser, address: text })}
                                        placeholder="Nhập địa chỉ của bạn"
                                        multiline
                                        numberOfLines={2}
                                    />
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Tài khoản</Text>
                                    <Text style={styles.infoValue}>{user.username}</Text>
                                </View>

                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Họ tên</Text>
                                    <Text style={styles.infoValue}>{user.name || 'Chưa cập nhật'}</Text>
                                </View>

                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Email</Text>
                                    <Text style={styles.infoValue}>{user.email || 'Chưa cập nhật'}</Text>
                                </View>

                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Số điện thoại</Text>
                                    <Text style={styles.infoValue}>{user.phone || 'Chưa cập nhật'}</Text>
                                </View>

                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Địa chỉ</Text>
                                    <Text style={styles.infoValue}>{user.address || 'Chưa cập nhật'}</Text>
                                </View>

                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Ngày tham gia</Text>
                                    <Text style={styles.infoValue}>{formatDate(user.createdAt)}</Text>
                                </View>
                            </>
                        )}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/orders')}>
                            <Text style={styles.seeAllText}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    {recentOrders.length > 0 ? (
                        recentOrders.slice(0, 3).map((order) => (
                            <TouchableOpacity
                                key={order._id}
                                style={styles.orderCard}
                                onPress={() => router.push({
                                    pathname: '/(tabs)/orders/[id]',
                                    params: { id: order._id }
                                })}
                            >
                                <View style={styles.orderHeader}>
                                    <Text style={styles.orderIdText}>#{order._id.slice(-6)}</Text>
                                    <View style={[
                                        styles.statusBadge,
                                        { backgroundColor: getStatusColor(order.status) }
                                    ]}>
                                        <Text style={styles.statusText}>{translateStatus(order.status)}</Text>
                                    </View>
                                </View>

                                <View style={styles.orderInfo}>
                                    <Text style={styles.orderInfoText}>{formatDate(order.createdAt)}</Text>
                                    <Text style={styles.orderInfoText}>{order.items.length} món</Text>
                                    <Text style={styles.orderTotal}>{order.total}k</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyOrders}>
                            <Text style={styles.emptyText}>Bạn chưa có đơn hàng nào</Text>
                            <TouchableOpacity
                                style={styles.browseButton}
                                onPress={() => router.push('/(tabs)/products')}
                            >
                                <Text style={styles.browseButtonText}>Đặt món ngay</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={[styles.section, { marginBottom: 32 + insets.bottom }]}>
                    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

// Helper functions
function getStatusColor(status: string) {
    switch (status) {
        case 'completed':
            return '#4caf50';
        case 'processing':
            return '#2196f3';
        case 'delivered':
            return '#9c27b0';
        case 'pending':
            return '#ff9800';
        case 'cancelled':
            return '#f44336';
        default:
            return '#9e9e9e';
    }
}

function translateStatus(status: string) {
    switch (status) {
        case 'completed':
            return 'Hoàn thành';
        case 'processing':
            return 'Đang xử lý';
        case 'delivered':
            return 'Đã giao';
        case 'pending':
            return 'Chờ xác nhận';
        case 'cancelled':
            return 'Đã hủy';
        default:
            return status;
    }
}