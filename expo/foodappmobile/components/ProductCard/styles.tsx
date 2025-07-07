import { BrandColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        position: 'relative',
    },
    cardContent: {
        width: '100%',
    },
    image: {
        height: 120,
        width: '100%',
    },
    placeholderImage: {
        height: 120,
        width: '100%',
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#999',
        fontSize: 14,
    },
    details: {
        padding: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: BrandColors.textSecondary,
        marginBottom: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: BrandColors.primary,
    },
    addButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: BrandColors.primary,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 22,
    },
});

export default styles;