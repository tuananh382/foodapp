import { Dimensions, StyleSheet } from "react-native";
import { BrandColors } from "../../constants/Colors";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '40%',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: width / 2,
        height: height / 5,
    },
    appTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: BrandColors.textOnPrimary,
        marginTop: 10,
    },
    formContainer: {
        backgroundColor: BrandColors.cardBackground,
        borderRadius: 20,
        padding: 25,
        width: width - 40,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 6,
        color: BrandColors.textPrimary
    },
    subheader: {
        color: BrandColors.textSecondary,
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: BrandColors.borderColor,
        borderRadius: 12,
        padding: 15,
        marginVertical: 8,
        backgroundColor: BrandColors.inputBackground,
        fontSize: 16
    },
    authButton: {
        backgroundColor: BrandColors.accent,
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        marginTop: 15,
    },
    authButtonText: {
        color: BrandColors.textOnPrimary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    switchButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    switchText: {
        color: BrandColors.accent,
        fontSize: 15,
        fontWeight: '600'
    },
});

export default styles;