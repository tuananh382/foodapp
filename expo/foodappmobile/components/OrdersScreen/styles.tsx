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
    filterContainer: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    filterScroll: {
        paddingHorizontal: 12,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        marginHorizontal: 4,
    },
    filterButtonActive: {
        backgroundColor: BrandColors.primary,
    },
    filterText: {
        fontSize: 14,
        color: BrandColors.textSecondary,
    },
    filterTextActive: {
        color: '#fff',
        fontWeight: '500',
    },
    listContent: {
        padding: 16,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    orderIdText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoItem: {
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 13,
        color: BrandColors.textSecondary,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        color: BrandColors.textPrimary,
        fontWeight: '500',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.primary,
    },
    itemsPreview: {
        flexDirection: 'row',
        marginTop: 8,
    },
    previewItem: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
        overflow: 'hidden',
        backgroundColor: '#f3f3f3',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    previewPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: BrandColors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewPlaceholderText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    moreItems: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreItemsText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: BrandColors.textSecondary,
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
        textAlign: 'center',
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
});

export default styles;