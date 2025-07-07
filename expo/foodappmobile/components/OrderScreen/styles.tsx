import { BrandColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
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
        padding: 8,
    },
    backButtonText: {
        fontSize: 24,
        color: BrandColors.textPrimary,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    orderIdText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    dateText: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        marginTop: 4,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    timeline: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        marginBottom: 8,
    },
    timelineStep: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timelineStepActive: {
        backgroundColor: BrandColors.primary,
    },
    timelineStepText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    timelineConnector: {
        flex: 1,
        height: 3,
        backgroundColor: '#e0e0e0',
    },
    timelineConnectorActive: {
        backgroundColor: BrandColors.primary,
    },
    timelineLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    timelineLabel: {
        fontSize: 12,
        color: BrandColors.textSecondary,
        textAlign: 'center',
        width: '33%',
    },
    section: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        marginHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
        marginBottom: 12,
    },
    addressText: {
        fontSize: 14,
        color: BrandColors.textPrimary,
        lineHeight: 20,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemQuantity: {
        fontSize: 14,
        fontWeight: 'bold',
        color: BrandColors.textSecondary,
        marginRight: 8,
    },
    itemName: {
        fontSize: 14,
        color: BrandColors.textPrimary,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    paymentLabel: {
        fontSize: 14,
        color: BrandColors.textSecondary,
    },
    paymentValue: {
        fontSize: 14,
        color: BrandColors.textPrimary,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
        marginTop: 8,
        paddingTop: 12,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.primary,
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
    },
    trackButton: {
        backgroundColor: BrandColors.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    trackButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;