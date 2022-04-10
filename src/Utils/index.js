import AsyncStorage from '@react-native-async-storage/async-storage';

//storing the value
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log('async_storage_save_error', e);
  }
};

//getting the value
export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue;
  } catch (e) {
    // error reading value
    console.log('async_storage_get_error', e);
  }
};
