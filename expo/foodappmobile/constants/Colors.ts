/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Brand colors for the food app
export const BrandColors = {
  primary: "#FF5722",
  secondary: "#FF9800",
  accent: "#4CAF50",
  background: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#757575",
  divider: "#BDBDBD",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#F44336",
  info: "#2196F3",

  // Brand gradient colors
  primaryGradient: ["#FF5722", "#FF9800"],
  accentGradient: ["#4CAF50", "#8BC34A"],
};

const tintColorLight = BrandColors.primary;
const tintColorDark = "#fff";

export default {
  light: {
    text: BrandColors.textPrimary,
    background: BrandColors.background,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    border: BrandColors.divider,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    border: "#444",
  },
};
