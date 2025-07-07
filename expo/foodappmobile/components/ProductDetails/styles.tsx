import { BrandColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
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
    cartButton: {
        padding: 8,
    },
    cartButtonText: {
        fontSize: 18,
        color: BrandColors.textPrimary,
    },
    contentContainer: {
        flex: 1,
    },
    imageContainer: {
        height: 250,
        width: '100%',
        backgroundColor: '#f8f8f8',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    noImageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
    },
    noImageText: {
        fontSize: 16,
        color: '#999',
    },
    productInfo: {
        padding: 16,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: BrandColors.primary,
        marginBottom: 16,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: BrandColors.textSecondary,
    },
    details: {
        fontSize: 15,
        lineHeight: 22,
        color: BrandColors.textSecondary,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
        backgroundColor: '#fff',
    },
    addToCartButton: {
        backgroundColor: BrandColors.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;