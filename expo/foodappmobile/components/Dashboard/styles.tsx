import { BrandColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    greeting: {
        fontSize: 14,
        color: BrandColors.textSecondary,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    iconButtonText: {
        fontSize: 20,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: BrandColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPlaceholderText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    banner: {
        margin: 16,
        borderRadius: 16,
        overflow: 'hidden',
        height: 140,
    },
    bannerGradient: {
        flex: 1,
    },
    bannerContent: {
        flexDirection: 'row',
        padding: 16,
    },
    bannerTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    bannerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    bannerSubtitle: {
        fontSize: 14,
        color: 'white',
        opacity: 0.9,
        marginBottom: 12,
    },
    bannerButton: {
        backgroundColor: 'white',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    bannerButtonText: {
        color: BrandColors.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    bannerImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
    },
    seeAllText: {
        color: BrandColors.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    categoryItem: {
        alignItems: 'center',
        width: '22%',
    },
    categoryIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    categoryIconText: {
        fontSize: 30,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '500',
        color: BrandColors.textPrimary,
    },
    horizontalListContent: {
        paddingHorizontal: 12,
        paddingBottom: 8,
    },
    horizontalCardContainer: {
        width: 200,
        marginHorizontal: 4,
    },
    emptyListText: {
        padding: 20,
        textAlign: 'center',
        color: BrandColors.textSecondary,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    orderIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    orderIconText: {
        fontSize: 20,
    },
    orderDetails: {
        flex: 1,
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: BrandColors.textPrimary,
    },
    orderStatus: {
        fontSize: 14,
        color: BrandColors.textSecondary,
    },
    orderPrice: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderPriceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BrandColors.textPrimary,
        marginRight: 8,
    },
    orderArrow: {
        fontSize: 16,
        color: BrandColors.textSecondary,
    },
});

export default styles;