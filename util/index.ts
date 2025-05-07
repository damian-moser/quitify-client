import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  storeItemWithTTL: async (
    key: string,
    value: string,
    ttlInSeconds: number
  ) => {
    const expiry = Date.now() + ttlInSeconds * 1000;
    const item = JSON.stringify({ value, expiry });
    await AsyncStorage.setItem(key, item);
  },
  getItemWithTTL: async (key: string): Promise<string | null> => {
    const jsonValue = await AsyncStorage.getItem(key);
    if (!jsonValue) return null;

    try {
      const { value, expiry } = JSON.parse(jsonValue);
      if (Date.now() > expiry) {
        await AsyncStorage.removeItem(key);
        return null;
      }
      return value;
    } catch {
      return null;
    }
  },
  removeTTLitem: async (key: string): Promise<null | void> => {
    const jsonValue = await AsyncStorage.getItem(key);
    if (!jsonValue) return null;

    await AsyncStorage.removeItem(key);
  },
};
