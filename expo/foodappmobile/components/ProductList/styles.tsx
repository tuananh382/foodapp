import { BrandColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 56,
        backgroundColor: '#fff',
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
    cartButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartButtonText: {
        fontSize: 20,
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    searchInput: {
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    categoryContainer: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    categoryScrollContent: {
        paddingHorizontal: 12,
    },
    categoryItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        marginHorizontal: 4,
    },
    categoryItemActive: {
        backgroundColor: BrandColors.primary,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: BrandColors.textSecondary,
    },
    categoryTextActive: {
        color: '#fff',
    },
    productListContent: {
        padding: 8,
        paddingBottom: 24,
    },
    productRow: {
        justifyContent: 'space-between',
    },
    productCardContainer: {
        width: '48%',
        marginHorizontal: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyImage: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: BrandColors.textSecondary,
        marginBottom: 16,
    },
    resetButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: BrandColors.primary,
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;