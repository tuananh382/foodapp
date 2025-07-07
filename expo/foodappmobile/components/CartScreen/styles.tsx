import { BrandColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: BrandColors.textSecondary,
        marginBottom: 20,
    },
    browseButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: BrandColors.primary,
    },
    browseButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartItem: {
        flexDirection: 'row',
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f3f3f3',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: BrandColors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: BrandColors.textPrimary,
    },
    itemPrice: {
        fontSize: 15,
        color: BrandColors.textSecondary,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 6,
        overflow: 'hidden',
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        width: 30,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    summaryContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    summaryText: {
        fontSize: 16,
        color: BrandColors.textSecondary,
    },
    summaryTotal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    checkoutButton: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    gradientButton: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;