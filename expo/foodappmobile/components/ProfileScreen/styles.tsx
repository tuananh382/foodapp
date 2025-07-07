import { BrandColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
        textAlign: 'center',
    },
    content: {
        flex: 1,
    },
    profileHeader: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 24,
        position: 'relative',
    },
    gradientBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: '#fff',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: BrandColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    userInfo: {
        fontSize: 16,
        color: BrandColors.textSecondary,
        marginTop: 4,
    },
    editButton: {
        marginTop: 16,
        paddingHorizontal: 24,
        paddingVertical: 10,
        backgroundColor: BrandColors.primary,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 12,
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    cancelButtonText: {
        color: BrandColors.textSecondary,
        fontSize: 16,
    },
    section: {
        padding: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
        marginBottom: 12,
    },
    seeAllText: {
        color: BrandColors.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    infoRow: {
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        color: BrandColors.textPrimary,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    orderIdText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderInfoText: {
        fontSize: 14,
        color: BrandColors.textSecondary,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.primary,
    },
    emptyOrders: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: BrandColors.textSecondary,
        marginBottom: 16,
    },
    browseButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: BrandColors.primary,
        borderRadius: 8,
    },
    browseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#f44336',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;