import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Storage keys used throughout the app
 */
export const STORAGE_KEYS = {
  USER: "user",
  AUTH_TOKEN: "auth_token",
  CART: "cart",
  RECENT_SEARCHES: "recent_searches",
  APP_SETTINGS: "app_settings",
};

/**
 * Store data in AsyncStorage
 * @param key Storage key
 * @param value Data to store
 */
export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
    throw error;
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param key Storage key
 * @returns The stored data or null if not found
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param key Storage key
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all app data from AsyncStorage
 */
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw error;
  }
};

/**
 * Store user data in AsyncStorage
 * @param userData User data object
 */
export const storeUserData = async (userData: any): Promise<void> => {
  await storeData(STORAGE_KEYS.USER, userData);
};

/**
 * Retrieve user data from AsyncStorage
 * @returns User data object or null if not found
 */
export const getUserData = async (): Promise<any> => {
  return await getData(STORAGE_KEYS.USER);
};

/**
 * Remove user data from AsyncStorage (for logout)
 */
export const removeUserData = async (): Promise<void> => {
  await removeData(STORAGE_KEYS.USER);
  await removeData(STORAGE_KEYS.AUTH_TOKEN);
};

export default {
  storeData,
  getData,
  removeData,
  clearAllData,
  storeUserData,
  getUserData,
  removeUserData,
  STORAGE_KEYS,
};
